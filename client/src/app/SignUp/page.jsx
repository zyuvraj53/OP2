"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../(components)/Navbar";

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

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`;

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

  const handleSubmit = async e => {
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
      const err = error;
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
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  if (!hasMounted) return null;

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div
        style={{
          background: "url('/SignUpBg.png')",
          backgroundAttachment: "fixed",
        }}
        className="flex-1 flex items-center justify-center bg-white p-4 bg-no-repeat bg-cover bg-bottom bg-fixed"
      >
        <div className="bg-[#f0dcc4] p-6 rounded-lg shadow-lg hover:shadow-2xl w-full max-w-md">
          <h1 className="text-[#97571c] text-center mb-8 text-3xl md:text-4xl font-bold">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {step === 1 ? (
              <>
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
                  <label
                    htmlFor="password"
                    className="text-[#97571c] font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="p-3 border-2 border-[#97571c] rounded focus:border-[#35261b] focus:outline-none focus:shadow-md transition-colors text-black placeholder-[#97571c]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#97571c] text-white p-3 rounded text-lg hover:bg-[#35261b] transition-colors hover:shadow-lg"
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[#97571c] font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="p-3 border-2 border-[#97571c] rounded focus:border-[#35261b] focus:outline-none focus:shadow-md transition-colors text-black placeholder-[#97571c]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="sex" className="text-[#97571c] font-medium">
                    Sex
                  </label>
                  <select
                    id="sex"
                    value={sex}
                    onChange={e => setSex(e.target.value)}
                    required
                    className="p-3 border-2 border-[#97571c] rounded focus:border-[#35261b] focus:outline-none focus:shadow-md transition-colors text-black placeholder-[#97571c]"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="address"
                    className="text-[#97571c] font-medium"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    placeholder="Enter your address"
                    className="p-3 border-2 border-[#97571c] rounded focus:border-[#35261b] focus:outline-none focus:shadow-md transition-colors text-black placeholder-[#97571c]"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#97571c] text-white p-3 rounded text-lg hover:bg-[#35261b] transition-colors hover:shadow-lg"
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-[#35261b] text-white p-3 rounded text-lg hover:bg-[#97571b] transition-colors hover:shadow-lg"
                >
                  Back
                </button>
              </>
            )}
          </form>

          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-[#97571c]" />
            <span className="text-[#97571c] text-sm">OR</span>
            <hr className="flex-1 border-[#97571c]" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full p-3 bg-[#97571c] text-white border-2 border-[#97571c] hover:border-[#35261b] rounded text-lg hover:bg-[#35261b] hover:text-white transition-all hover:shadow-lg"
          >
            Sign In with Google
          </button>

          <p className="text-center mt-4 text-[#97571c] text-sm">
            Already have an account?{" "}
            <Link
              href="/SignIn"
              className="underline hover:text-[#35261b] transition-colors"
            >
              Continue with Signing-In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
