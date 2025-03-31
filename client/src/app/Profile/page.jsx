"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../(components)/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


// OrdersList Component (updated to handle null productId)
const OrdersList = ({ orders }) => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const productImage = order.items[0]?.productId?.image || "/file.svg";
        const productPrice = order.items[0]?.price || order.totalAmount;
        const productName = order.items[0]?.productId?.name || "Unknown Product";

        return (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-md"
          >
            <div className="w-20 h-20 flex-shrink-0">
              <Image
                src={productImage}
                alt={productName}
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <p className="text-[#d99527] font-semibold">${productPrice.toFixed(2)}</p>
              <p className="text-gray-600 text-sm">
                Product: <span className="font-semibold">{productName}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "shipped"
                      ? "text-blue-600"
                      : order.status === "pending"
                      ? "text-[#eca72f]"
                      : "text-red-600"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Updated ProfilePage Component
export default function ProfilePage() {
  const { user: authUser, logout } = useAuth(); // Get user and logout from context
  const [orders, setOrders] = useState(null); // Null if fetch fails or no orders
  const [loading, setLoading] = useState(true);

  console.log(authUser);

  useEffect(() => {
    const fetchOrders = () => {
      if (!authUser || !authUser._id) {
        setOrders(null); // No user or _id, no orders
        setLoading(false);
        return;
      }

      axios
        .get<{ success, orders }>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order/`,
          {
            headers: {
              'Content-Type': 'application/json',
              // Add any authentication headers if required, e.g., Authorization: `Bearer ${token}`
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            // Filter orders by the authenticated user's _id (since uid isn’t in API user object)
            const userOrders = res.data.orders.filter((order) => order.user._id === authUser._id);
            setOrders(userOrders.length > 0 ? userOrders : null); // Set null if no orders match
          } else {
            setOrders(null); // API returned success: false
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch Error:", err);
          setOrders(null); // Set null on fetch failure
          setLoading(false);
        });
    };

    fetchOrders();
  }, [authUser]); // Dependency on authUser

  const handleSignOut = () => {
    logout();
    window.location.href = "/";
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!authUser) return <div className="text-red-500 text-center mt-10 text-lg">No user data available</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#eca72f] mb-4">
              <Image
                src={authUser.images[0]}
                alt="Profile Icon"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#d99527]">{authUser.name}</h1>
            <p className="text-gray-600 text-sm sm:text-base">{authUser.email}</p>
          </div>

          {/* Profile Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#eca72f] mb-4">Profile Details</h2>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-[#d99527]">Sex: </span>
                <span className="text-gray-700">{authUser.sex || "Not set"}</span>
              </div>
              <div>
                <span className="font-semibold text-[#d99527]">Address: </span>
                <span className="text-gray-700">{authUser.address}</span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-6 w-full sm:w-auto px-6 py-2 bg-[#d99527] text-white rounded-md hover:bg-[#eca72f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
            >
              Sign Out
            </button>
          </div>

          {/* Orders List - Only shown if orders exist */}
          {orders && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#eca72f] mb-4">Your Orders</h2>
              <OrdersList orders={orders} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}