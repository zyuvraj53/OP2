"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Navbar from "../(components)/Navbar";

// Define an error type for better type safety
const SignIn = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/Admin");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      console.log("Login Successful");
      // Redirect is handled by useEffect
    } catch (err) {
      // Changed from any to unknown
      const error = err; // Type assertion with our custom interface
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid credentials.");
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col" >
      <Navbar />
      <div
        style={{ backgroundImage: "url('/SignUpBg.png')" }}
        className="flex-1 flex items-center justify-center bg-no-repeat bg-cover bg-bottom p-4"
      >
        {/* style={{ backgroundImage: "url('/background.jpg')" }}
        className="bg-no-repeat bg-cover bg-bottom w-full h-screen" */}

        <div className="bg-[#f0dcc4] p-6 rounded-lg shadow-lg hover:shadow-2xl w-full max-w-md">
          <h1 className="text-[#97571c] text-center mb-8 text-3xl md:text-4xl font-bold">
            Sign In
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#97571c] font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="p-3 border-2 border-[#97571c] rounded focus:border-[#35261b] focus:outline-none focus:shadow-md transition-colors text-black placeholder-[#97571c]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[#97571c] font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="p-3 border-2 border-[#97571c] rounded focus:border-[#35261b] focus:outline-none transition-colors text-black placeholder-[#97571b] focus:shadow-md"
              />
            </div>

            <button
              type="submit"
              className="bg-[#97571c] text-white p-3 rounded text-lg hover:bg-[#35261b] transition-colors hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-4 text-[#97571b] text-sm">
            Not registered yet?{" "}
            <Link
              href="/SignUp"
              className="underline hover:text-[#35261b] transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
