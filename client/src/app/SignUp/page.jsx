"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


const SignUp = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && user) {
      router.push("/");
    }
  }, [hasMounted, user, router]);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");

  const API_URL = "http://localhost:8080/api/auth/register";
  const API_BASE_URL = "http://localhost:8080";

  const handleNext = () => {
    if (email && password) {
      setStep(2);
    } else {
      toast.error("Please fill in email and password");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name || !sex || !address) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post(API_URL, {
        uid: crypto.randomUUID(),
        name,
        email,
        password,
        sex,
        address,
        role: "user",
      });
      toast.success("Registration successful!");
      router.push("/SignIn");
    } catch (error) {
      const err = error ;
      if (err.response?.status === 400) {
        if (err.response.data?.message === "User already exists") {
          toast.error("User already exists! Redirecting to Sign In...");
          setTimeout(() => router.push("/SignIn"), 2000);
        } else {
          toast.error(err.response.data?.message || "Registration failed");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-[#eca72f] text-center mb-8 text-3xl md:text-4xl font-bold">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {step === 1 ? (
            <>
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
                type="button"
                onClick={handleNext}
                className="bg-[#eca72f] text-white p-3 rounded text-lg hover:bg-[#d99527] transition-colors"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[#eca72f] font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="p-3 border-2 border-[#eca72f] rounded focus:border-[#d99527] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="sex" className="text-[#eca72f] font-medium">
                  Sex
                </label>
                <select
                  id="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value )}
                  required
                  className="p-3 border-2 border-[#eca72f] rounded focus:border-[#d99527] focus:outline-none transition-colors"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-[#eca72f] font-medium">
                  Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="Enter your address"
                  className="p-3 border-2 border-[#eca72f] rounded focus:border-[#d99527] focus:outline-none transition-colors"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="bg-[#eca72f] text-white p-3 rounded text-lg hover:bg-[#d99527] transition-colors"
              >
                Sign Up
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-200 text-[#eca72f] p-3 rounded text-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
            </>
          )}
        </form>

        <div className="flex items-center gap-4 my-6">
          <hr className="flex-1 border-[#eca72f]" />
          <span className="text-[#eca72f] text-sm">OR</span>
          <hr className="flex-1 border-[#eca72f]" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full p-3 bg-white text-[#eca72f] border-2 border-[#eca72f] rounded text-lg hover:bg-[#eca72f] hover:text-white transition-all"
        >
          Sign In with Google
        </button>

        <p className="text-center mt-4 text-[#eca72f] text-sm">
          Already have an account?{" "}
          <Link
            href="/SignIn"
            className="underline hover:text-[#d99527] transition-colors"
          >
            Continue with Signing-In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;