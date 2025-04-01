"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const categories = [
  "Nuapatna Silk",
  "Sambalpuri Silk",
  "Exclusive Cotton",
  "Berhampuri Silk",
  "Gopalpur Tussar",
  "Maniabandha Cotton",
  "Men's Fashion",
  "Dupatta",
  "Yardages",
  "Cuttack Tarakasi",
  "Dhokra of Odisha",
  "Cushion Cover",
  "Laptop Bags",
  "Vanity Pouch",
  "Coin Pouch",
  "Handbag",
  "Pattachitra",
  "Lacquer Craft",
  "Talapatra/Palm leaf",
  "Hand-painted Box",
  "Terracotta",
  "Dhokra Art",
  "Traditional Toys",
  "Home Furnishing",
];

export default function Admin() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchPid, setSearchPid] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState({
    ratings: {
      fakeRating: 0,
      average: 0,
      count: 0,
      reviews: [],
    },
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/");
      } else if (user.role !== "admin") {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [user, router]);

  const handlePidCheck = async () => {
    if (!searchPid.trim()) {
      setError("Please enter a PID");
      return;
    }

    setError(null);
    setIsChecking(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/pid",
        { pid: searchPid.trim() },
        {
          withCredentials: true,
        }
      );
      const { product } = response.data;
      setProductData(product);
      setFormData({
        ...product,
        ratings: {
          ...product.ratings,
          reviews: product.ratings.reviews || [],
        },
      });
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Product not found");
      setProductData(null);
      setFormData({
        ratings: {
          fakeRating: 0,
          average: 0,
          count: 0,
          reviews: [],
        },
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested ratings fields
    if (name.includes("ratings.")) {
      const [parent, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: Number(value),
        },
      }));
    }
    // Handle regular fields
    else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name.includes("Price") || name === "stock" ? Number(value) : value,
      }));
    }
  };

  const handleUpdate = async () => {
    if (!productData) return;

    try {
      await axios.put(
        `http://localhost:8080/api/product/${productData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-row">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Find Product by PID
            </h1>

            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter Product PID
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={searchPid}
                    onChange={(e) => setSearchPid(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#eca72f] focus:border-transparent"
                    placeholder="Enter product PID"
                  />
                  <button
                    type="button"
                    onClick={handlePidCheck}
                    disabled={isChecking}
                    className="bg-[#eca72f] text-white px-4 py-2 rounded-md hover:bg-[#d99527] disabled:opacity-50"
                  >
                    {isChecking ? "Checking..." : "Find Product"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              {updateSuccess && (
                <div className="p-3 bg-green-50 text-green-700 rounded-md">
                  Product updated successfully!
                </div>
              )}
            </div>

            {productData && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PID
                    </label>
                    <input
                      type="text"
                      name="pid"
                      value={formData.pid || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Actual Price
                    </label>
                    <input
                      type="number"
                      name="actualPrice"
                      value={formData.actualPrice || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Selling Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cut Price
                    </label>
                    <input
                      type="number"
                      name="cutPrice"
                      value={formData.cutPrice || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fake Rating (1-5)
                    </label>
                    <input
                      type="number"
                      name="ratings.fakeRating"
                      value={formData.ratings?.fakeRating || ""}
                      onChange={handleInputChange}
                      min="1"
                      max="5"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Update Product
                  </button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">
                    Current Product Data
                  </h3>
                  <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(productData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-4 w-48">
        <button className="bg-[#eca72f] text-white text-center px-6 py-2 rounded-md hover:bg-[#d99527]">
          Create Blog
        </button>
        <button className="bg-[#eca72f] text-white text-center px-6 py-2 rounded-md hover:bg-[#d99527]">
          Set Order Details
        </button>
      </div>
    </div>
  );
}
