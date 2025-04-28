import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#e8c49c]">
      <div className="flex flex-col items-center gap-4 bg-[#f0dcc4] p-8 rounded-lg shadow-lg border-2 border-[#97571c] animate-pulse">
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#97571c]"
        ></div>
        <p className="text-[#97571c] text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}