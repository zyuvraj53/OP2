"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../(components)/Navbar";

const Checkout = () => {
  const { user } = useAuth();
  const { cart, loading, clearCart } = useCart();

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    apartment: "",
    street: "",
    city: "",
    zip: "",
    address: user?.address || "",
  });

  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    console.log("User details:", user);
    console.log("Cart details:", cart);
    console.log("Cart data:", cart);

    const cartItems = cart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.price,
    }));
    setItems(cartItems);
  }, [user, cart]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Required field";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (["apartment", "street", "city", "zip"].includes(name)) {
        updatedData.address = `${updatedData.apartment}, ${updatedData.street}, ${updatedData.city} - ${updatedData.zip}`;
      }
      return updatedData;
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update`,
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        },
        { withCredentials: true }
      );
      if (response.status !== 200) {
        throw new Error("Failed to update user details.");
      }
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setUpdateError("Failed to update details. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const totalAmount =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const paymentHandler = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK not loaded yet. Please try again.");
      return;
    }
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }
    if (totalAmount <= 0) {
      alert("Cart is empty. Add items before proceeding.");
      return;
    }

    setPaymentError(null);

    try {
      const { data: order } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/order`,
        {
          amount: totalAmount * 100,
          currency: "INR",
          receipt: "order_rcptid_11",
        }
      );

      if (!order.id) throw new Error("Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "odhisha potli",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const { data: jsonRes } = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/payment/validate`,
              response
            );
            alert(jsonRes.msg);
            if (jsonRes.msg === "Success") {
              const orderData = {
                items: items.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                })),
                paymentMethod: "COD",
                shippingAddress: formData.address,
              };

              console.log("Order Data:", orderData);

              const { data: orderRes } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/order/create`,
                orderData,
                { withCredentials: true }
              );
              console.log(orderRes);
              if (orderRes.success) {
                clearCart();
                alert("Order placed successfully!");
                router.push("/orders");
              } else {
                alert("Order creation failed. Please contact support.");
              }
            } else {
              alert("Payment validation failed.");
            }
          } catch (error) {
            console.error(
              "Order creation or payment validation failed:",
              error
            );
            alert("Error processing order. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        alert("Payment failed: " + response.error.reason);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      setPaymentError("Payment failed, please try again.");
    }
  };

  const locateMe = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        try {
          const { data } = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (data.address) {
            setFormData((prev) => ({
              ...prev,
              street: data.address.road || "",
              city: data.address.city || data.address.town || "",
              zip: data.address.postcode || "",
              address: `${data.address.road || ""}, ${
                data.address.city || data.address.town || ""
              } - ${data.address.postcode || ""}`,
            }));
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocationError("Could not fetch location details.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Could not get your location.");
      }
    );
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#d99527] mb-6">
          Checkout
        </h1>

        <button
          onClick={locateMe}
          className="w-full bg-gray-500 text-white px-6 py-2 rounded mt-4 hover:bg-gray-600"
        >
          Locate Me
        </button>
          {locationError && (
              <p className="text-red-500 text-sm mt-2">{locationError}</p>
          )}

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-6">
          <h2 className="text-xl font-semibold text-[#eca72f]">
            Shipping Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-black">
            {[
              "name",
              "email",
              "phone",
              "apartment",
              "street",
              "city",
              "zip",
            ].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 text-black"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-600"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Details"}
          </button>
          {updateSuccess && (
            <p className="text-green-500 text-sm mt-2">
              Details updated successfully!
            </p>
          )}
          {updateError && (
              <p className="text-red-500 text-sm mt-2">{updateError}</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-6">
          <h2 className="text-xl font-semibold text-[#eca72f]">Cart Items</h2>
          {loading ? (
            <p className="text-gray-500">Loading cart...</p>
          ) : cart && cart.length > 0 ? (
            <>
              <div className="mt-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-center gap-4"
                  >
                    <Link href={`/products/${item._id}`}>
                      <img
                        src={item.productId.images}
                        alt={item.productId.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md cursor-pointer"
                      />
                    </Link>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#eca72f]">
                        {item.productId.name}
                      </h2>
                      <p className="text-gray-700">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-800">
                Total Amount: ₹{totalAmount.toFixed(2)}
              </div>
              <button
                onClick={paymentHandler}
                className="w-full bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600"
              >
                Pay ₹{totalAmount.toFixed(2)}
              </button>
              {paymentError && (
                  <p className="text-red-500 text-sm mt-2">{paymentError}</p>
              )}
            </>
          ) : (
            <p className="text-gray-500">Cart is empty.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;