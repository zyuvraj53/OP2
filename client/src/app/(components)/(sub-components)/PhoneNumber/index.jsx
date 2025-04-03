"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";

const PhoneNumber = () => {
  const [phone, setPhone] = useState("");
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsMediumScreen(mediaQuery.matches);

    const handleChange = (e) => setIsMediumScreen(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [window]); 

  const inputStyle = {
    width: isMediumScreen ? "528px" : "100%",
  };

  return (
    <div className="w-full">
      <label className="mb-2 text-lg font-semibold text-black"></label>
      <PhoneInput
        country={"in"}
        value={phone}
        onChange={setPhone}
        enableSearch={true}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: false,
        }}
        inputStyle={inputStyle}
        containerClass="w-full"
        inputClass="w-full h-10 pr-3 text-lg border-2 rounded-lg bg-gray-200 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        className="text-black lg:pr-50"
      />
    </div>
  );
};

export default PhoneNumber;