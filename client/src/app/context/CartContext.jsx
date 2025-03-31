"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      await fetchCart();
    };
    fetchData();
  }, []);

  // Fetch User Profile
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/profile`, { withCredentials: true });
      setUser(response.data);
    } catch {
      setUser(null);
    }
  };

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`, { withCredentials: true });
      setCart(res.data.cart?.items ?? []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.warn("Cart not found, initializing empty cart.");
          setCart([]);
        } else if (error.response?.status === 401) {
          console.warn("User not authenticated. Redirecting to login...");
          setCart([]);
        } else {
          console.error("Fetch Cart Error:", error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(`${API_URL}/api/cart/add`, { productId, quantity }, { withCredentials: true });
      setCart(res.data.cart?.items ?? []);
    } catch (error) {
      console.error("Add to Cart Error:", error);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (productId, quantity) => {
    try {
      const res = await axios.put(`${API_URL}/api/cart/update`, { productId, quantity }, { withCredentials: true });
      setCart(res.data.cart?.items ?? []);
    } catch (error) {
      console.error("Update Cart Item Error:", error);
    }
    fetchCart();
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`${API_URL}/api/cart/remove`, { data: { productId }, withCredentials: true });
      setCart(res.data.cart?.items ?? []);
    } catch (error) {
      console.error("Remove from Cart Error:", error);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/api/cart/clear`, { withCredentials: true });
      setCart([]);
    } catch (error) {
      console.error("Clear Cart Error:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, user, loading, fetchUser, fetchCart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
