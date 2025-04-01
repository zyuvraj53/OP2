"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";

const PhoneNumber = () => {
  const [phone, setPhone] = useState("");

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
        containerClass="w-full"
        inputClass="w-full h-10 px-3 text-lg border-2 rounded-lg bg-gray-200 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        className="text-black"
      />
    </div>
  );
};

export default PhoneNumber;