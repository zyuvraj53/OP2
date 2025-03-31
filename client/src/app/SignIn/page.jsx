"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

// Define an error type for better type safety
const SignIn = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push("/Admin");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      console.log("Login Successful");
      // Redirect is handled by useEffect
    } catch (err) {  // Changed from any to unknown
      const error = err ;  // Type assertion with our custom interface
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid credentials.");
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-[#eca72f] text-center mb-8 text-3xl md:text-4xl font-bold">
          Sign In
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#eca72f] font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="p-3 border-2 border-[#eca72f] rounded focus:border-[#d99527] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[#eca72f] font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="p-3 border-2 border-[#eca72f] rounded focus:border-[#d99527] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="bg-[#eca72f] text-white p-3 rounded text-lg hover:bg-[#d99527] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-[#eca72f] text-sm">
          Not registered yet?{" "}
          <Link href="/signup" className="underline hover:text-[#d99527] transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;