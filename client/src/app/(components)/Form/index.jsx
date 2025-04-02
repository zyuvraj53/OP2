"use client";

import PhoneNumber from "../(sub-components)/PhoneNumber";

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const formObject = Object.fromEntries(data.entries());
    console.log("Form Data:", formObject);
  };

  return (
    <div className="py-16 flex justify-center items-center min-w-1/2 ">
      <form
        onSubmit={handleSubmit}
        action="submit"
        className="max-w-xl mx-auto p-6 bg-slate-50 [box-shadow:0_-4px_6px_-1px_rgba(0,0,0,0.1)] shadow-md rounded-lg"
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
          />
        </div>

        {/* Phone Number Component */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-1">Phone Number</label>
          <PhoneNumber />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          //<label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="w-full h-10 px-3 text-lg border-2 rounded-lg bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
