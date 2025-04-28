"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../(components)/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const OrdersList = ({ orders }) => {
  if (!orders.length) return null;

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const productImage =
          order.items?.[0]?.productId?.images?.[0] || "/file.svg";
        const productPrice = order.items?.[0]?.price || order.totalAmount;
        const productName =
          order.items?.[0]?.productId?.name || "Unknown Product";

        return (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-2 border-[#97571c] rounded-lg bg-[#f0dcc4] shadow-md"
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
              <p className="text-[#97571c] font-semibold">
                {productPrice.toFixed(2)}
              </p>
              <p className="text-[#744d20] text-sm">
                Product: <span className="font-semibold">{productName}</span>
              </p>
              <p className="text-[#744d20] text-sm">
                Status:
                <span
                  className={`font-semibold ${
                    order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "shipped"
                      ? "text-blue-600"
                      : order.status === "pending"
                      ? "text-[#97571c]"
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

export default function ProfilePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user: authUser, logout } = useAuth();

  useEffect(() => {
    if (!authUser || !authUser._id) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order/orders/user`,
          { withCredentials: true }
        );
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authUser, router]);

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  if (loading) return null; // Rely on loading.tsx

  if (!authUser)
    return (
      <div className="text-red-500 text-center mt-10 text-lg bg-[#e8c49c] min-h-screen">
        No user data available
      </div>
    );

  return (
    <div className="flex flex-col bg-[#e8c49c] min-h-screen">
      <Navbar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center bg-[#f0dcc4] p-6 rounded-lg shadow-lg hover:shadow-2xl border-2 border-[#97571c]">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#97571c] mb-4">
              <Image
                src={authUser.images?.[0] || "/DefaultIcon.png"}
                alt="Profile Image"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#97571c]">
              {authUser.name}
            </h1>
            <p className="text-[#744d20] text-sm sm:text-base">
              {authUser.email}
            </p>
          </div>

          {/* Profile Details */}
          <div className="bg-[#f0dcc4] p-6 rounded-lg shadow-lg hover:shadow-2xl border-2 border-[#97571c]">
            <h2 className="text-2xl font-semibold text-[#97571c] mb-4">
              Profile Details
            </h2>
            <div className="space-y-4">
              <div className="text-[#97551c]">
                <span className="font-semibold text-[#97551c] ">Sex: </span>
                {authUser.sex || "Not set"}
              </div>
              <div className="text-[#97551c]">
                <span className="font-semibold text-[#97551c] ">Address: </span>
                {authUser.address || "Not set"}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-6 w-full sm:w-auto px-6 py-2 bg-[#97571c] text-white rounded-lg hover:bg-[#35261b] transition-colors hover:shadow-lg"
            >
              Sign Out
            </button>
          </div>

          {/* Orders */}
          {error ? (
            <div className="text-center text-red-500 bg-[#f0dcc4] p-6 rounded-lg shadow-lg border-2 border-[#97571c]">
              {error}
            </div>
          ) : orders.length > 0 ? (
            <div className="bg-[#f0dcc4] p-6 rounded-lg shadow-lg hover:shadow-2xl border-2 border-[#97571c]">
              <h2 className="text-2xl font-semibold text-[#97571c] mb-4">
                Your Orders
              </h2>
              <OrdersList orders={orders} />
            </div>
          ) : (
            <div className="text-center bg-[#f0dcc4] p-6 rounded-lg shadow-lg border-2 border-[#97571c]">
              <p className="text-lg text-[#744d20] mb-4">You have no orders.</p>
              <button
                onClick={() => router.push("/")}
                className="bg-[#97571c] text-white py-3 px-6 rounded-lg hover:bg-[#35261b] transition-colors hover:shadow-lg text-lg font-semibold"
              >
                Go to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}