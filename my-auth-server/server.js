require("dotenv").config();

// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg"); // Import the pg Pool

const app = express();
app.use(cors());
app.use(bodyParser.json());

const postgresPass = process.env.POSTGRES_PASSWORD;
const jwtPass = process.env.JWT_PASS;

// PostgreSQL Connection Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecom",
  password: postgresPass,
  port: 5432,
});

const JWT_SECRET = jwtPass;

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // if the token is no longer valid
    req.user = user; // Add user payload to request object
    next();
  });
};

// --- User Routes ---
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email",
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    // **MODIFIED**: Send back name and email along with the token
    res.status(200).json({ token, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Cart Routes (Protected) ---

// GET /api/cart - Fetch user's cart
app.get("/api/cart", authenticateToken, async (req, res) => {
  try {
    const cartItems = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1 ORDER BY id",
      [req.user.id]
    );
    res.json(cartItems.rows);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/cart/add - Add item to cart (or update quantity)
app.post("/api/cart/add", authenticateToken, async (req, res) => {
  const { id: product_id, name, price, imageUrl: image_url } = req.body.product;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, name, price, image_url, quantity)
       VALUES ($1, $2, $3, $4, $5, 1)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + 1
       RETURNING *;`,
      [user_id, product_id, name, price, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/cart/remove/:productId - Remove item from cart
app.delete(
  "/api/cart/remove/:productId",
  authenticateToken,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { id: user_id } = req.user;
      await pool.query(
        "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
        [user_id, productId]
      );
      res.status(204).send(); // No Content
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /api/cart/clear - Clear the entire cart for a user
app.delete("/api/cart/clear", authenticateToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM cart_items WHERE user_id = $1", [
      req.user.id,
    ]);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/cart/update - Update item quantity
app.put("/api/cart/update", authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const user_id = req.user.id;

  // Ensure quantity is a positive number
  if (quantity < 1) {
    // If quantity is 0 or less, we should just remove the item
    try {
      await pool.query(
        "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
        [user_id, productId]
      );
      return res.status(204).send(); // No Content, indicates success
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  try {
    const result = await pool.query(
      `UPDATE cart_items
         SET quantity = $1
         WHERE user_id = $2 AND product_id = $3
         RETURNING *;`,
      [quantity, user_id, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Attempting to disconnect from database...");
  await pool.end();
  console.log("Database connection closed.");
  process.exit(0);
});
