"use client";

import { useState } from "react";
import PhoneNumber from "../(sub-components)/PhoneNumber";
import emailjs from "emailjs-com";

const Form = () => {
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
  
    formObject.sender_email = formObject.email;
  
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_PUBLIC_KEY_EMAILJS;
  
    if (!userID) {
      console.error("Error: User ID is missing. Check .env.local file.");
      alert("Configuration error: User ID is missing.");
      return;
    }
  
    emailjs.send(serviceID, templateID, formObject, userID)
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert("Thank you for contacting us. Our team will reach back to you soon!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to submit the form. Please try again.");
      });
  
    form.reset();
  };
  

  return (
    <div className="py-16 flex justify-center items-center min-w-1/2 ">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-slate-50 shadow-md rounded-lg"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            className="w-full h-10 px-3 text-lg border-2 rounded-lg bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Phone Number Component */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-1">Phone Number</label>
          <PhoneNumber />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="w-full h-10 px-3 text-lg border-2 rounded-lg bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="desc" className="block text-lg font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Enter Description"
            className="w-full h-40 px-3 py-2 text-lg border-2 rounded-lg bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
