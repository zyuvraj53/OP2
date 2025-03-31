// app/404.tsx
import React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* 404 Header */}
      <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-[#d99527] mb-6">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#eca72f] mb-4 text-center">
        Oops! Page Not Found
      </h2>
      <p className="text-base sm:text-lg text-gray-700 mb-8 text-center max-w-md">
        It seems we can’t find the page you’re looking for. Let’s get you back on track!
      </p>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="bg-[#d99527] text-white py-3 px-6 rounded-md hover:bg-[#eca72f] transition-colors text-lg font-semibold flex items-center gap-2"
      >
        <span>Back to Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h18m-6-6l6 6-6 6"
          />
        </svg>
      </Link>
    </div>
  );
}