"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the context
const WishlistContext = createContext(undefined);

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`;

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/get`, { withCredentials: true });
      if (data.success) setWishlist(data.wishlist || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    }
  };

  const addToWishlist = async (productId) => {
    if (!productId) return alert("Enter a valid Product ID");
    try {
      const { data } = await axios.post(
        `${API_URL}/add`,
        { productId },
        { withCredentials: true }
      );
      if (data.success) fetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!productId) return alert("Enter a valid Product ID");
    try {
      const { data } = await axios.post(
        `${API_URL}/remove`,
        { productId },
        { withCredentials: true }
      );
      if (data.success) fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const clearWishlist = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/clear`, { withCredentials: true });
      if (data.success) setWishlist([]);
    } catch (error) {
      console.error("Error clearing wishlist:", error);
    }
  };

  const toggleWishlist = async (item) => {
    const productId = item._id;
    if (!productId) return alert("Invalid product ID");

    const isInWishlist = wishlist.some((wishlistItem) => wishlistItem._id === productId);
    if (isInWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, fetchWishlist, addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
