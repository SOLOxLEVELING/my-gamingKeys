import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useToast } from "./ToastContext";

export const CartContext = createContext();

// Get the API URL from the environment variable
const API_URL = import.meta.env.VITE_API_URL;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCart = async () => {
      if (user && user.token) {
        try {
          // Use the API_URL variable
          const response = await fetch(`${API_URL}/api/cart`, {
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

  const addToCart = async (product, quantity, variantInfo) => {
    if (!user) {
      showToast("Please log in to add items to your cart.", "error");
      return;
    }
    try {
      // Use the API_URL variable
      const response = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ product, quantity, variantInfo }),
      });

      if (!response.ok) throw new Error("Failed to add item.");

      const updatedItem = await response.json();

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
      showToast(`${product.name} added to cart!`, "success");
    } catch (error) {
      console.error("Error in addToCart:", error);
      showToast("Error adding item to cart.", "error");
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      // Use the API_URL variable
      await fetch(`${API_URL}/api/cart/remove/${productId}`, {
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
      if (newQuantity < 1) {
        return removeFromCart(productId);
      }
      // Use the API_URL variable
      const response = await fetch(`${API_URL}/api/cart/update`, {
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
      // Use the API_URL variable
      await fetch(`${API_URL}/api/cart/clear`, {
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
