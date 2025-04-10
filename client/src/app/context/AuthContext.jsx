"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to track API call

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.error("Authentication check failed:", err);
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false after the check completes
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (err) {
      console.error("Login failed:", err);
      throw new Error("Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.get(`${API_URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
      throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
