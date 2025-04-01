"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../(components)/Navbar";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order/orders/user`,
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.orders); // Assuming the data has an "orders" key
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#d99527] mb-6">
            Your Orders
          </h1>
          {loading ? (
            <p className="text-center text-gray-500">Loading orders...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => {
                const productImage =
                  order.items[0]?.productId?.images[0] || "/file.svg";
                const productPrice =
                  order.items[0]?.productId?.price || order.totalAmount;
                const productName =
                  order.items[0]?.productId?.name || "Unknown Product";
                const paymentMethod = order.paymentMethod || "Unknown";
                const shippingAddress = order.shippingAddress || "Not Provided";
                const estimatedDelivery = order.estimatedDelivery
                  ? new Date(order.estimatedDelivery).toLocaleDateString()
                  : "Not Available";

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
                      <p className="text-[#d99527] font-semibold">
                        ${productPrice.toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Product:{" "}
                        <span className="font-semibold">{productName}</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        Payment Method:{" "}
                        <span className="font-semibold">{paymentMethod}</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        Shipping Address:{" "}
                        <span className="font-semibold">{shippingAddress}</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        Estimated Delivery:{" "}
                        <span className="font-semibold">
                          {estimatedDelivery}
                        </span>
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
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">You have no orders.</p>
              <button
                onClick={() => router.push("/")}
                className="bg-[#d99527] text-white py-3 px-6 rounded-md hover:bg-[#eca72f] transition-colors text-lg font-semibold"
              >
                Go to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
