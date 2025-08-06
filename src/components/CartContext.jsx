import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useToast } from "./ToastContext"; // 1. Import useToast

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const { showToast } = useToast(); // 2. Get the showToast function

  useEffect(() => {
    const fetchCart = async () => {
      if (user && user.token) {
        try {
          const response = await fetch("http://localhost:4000/api/cart", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          if (!response.ok) throw new Error("Could not fetch cart");
          const data = await response.json();
          setCart(data);
        } catch (error) {
          console.error(error.message);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };
    fetchCart();
  }, [user]);

  // ... (imports and other functions remain the same)

  const addToCart = async (product, quantity, variantInfo) => {
    if (!user) {
      showToast("Please log in to add items to your cart.", "error"); // Use toast for error
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        // Send product, quantity, and variantInfo in the body
        body: JSON.stringify({ product, quantity, variantInfo }),
      });

      if (!response.ok) throw new Error("Failed to add item.");

      const updatedItem = await response.json();

      // This logic will now correctly add new variants or update existing ones.
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (p) =>
            p.product_id === updatedItem.product_id &&
            p.variant_info === updatedItem.variant_info
        );
        if (existingItemIndex > -1) {
          const newCart = [...prevCart];
          newCart[existingItemIndex] = updatedItem;
          return newCart;
        } else {
          return [...prevCart, updatedItem];
        }
      });
      showToast(`${product.name} added to cart!`, "success"); // 3. Replace alert with success toast
    } catch (error) {
      console.error("Error in addToCart:", error);
      showToast("Error adding item to cart.", "error"); // Use toast for error
    }
  };

  // Make sure to export the updated addToCart function in the provider value
  // ...

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      await fetch(`http://localhost:4000/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart((prevCart) =>
        prevCart.filter((item) => item.product_id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return;
    try {
      // If new quantity is 0 or less, the backend will handle removal
      if (newQuantity < 1) {
        return removeFromCart(productId);
      }

      const response = await fetch("http://localhost:4000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      if (!response.ok) throw new Error("Failed to update quantity.");

      const updatedItem = await response.json();
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product_id === productId ? updatedItem : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await fetch("http://localhost:4000/api/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
