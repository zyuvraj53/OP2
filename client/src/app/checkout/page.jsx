"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../(components)/Navbar";
import { MapPin } from "lucide-react";

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
    const cartItems = cart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.price,
    }));
    setItems(cartItems);
  }, [cart]);

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

              const { data: orderRes } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/order/create`,
                orderData,
                { withCredentials: true }
              );
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
        theme: { color: "#97571c" }, // Updated to match theme
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
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
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
      <Navbar />
      <div className="min-h-screen bg-[#f0dcc4] p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#97571c] mb-6">
            Checkout
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-6">
            <h2 className="text-xl font-semibold text-[#97571c] mb-4">
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
              {["name", "email", "phone", "apartment", "street", "city"].map(
                (field) => (
                  <div key={field}>
                    <input
                      type="text"
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eca72f] transition-all duration-200"
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                )
              )}
              <div className="relative">
                <input
                  type="text"
                  name="zip"
                  placeholder="Zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eca72f] transition-all duration-200"
                />
                <button
                  onClick={locateMe}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#97571c] hover:text-[#35261b] transition-all duration-200"
                  aria-label="Locate me"
                >
                  <MapPin size={24} />
                </button>
                {errors.zip && (
                  <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                )}
              </div>
            </div>
            {locationError && (
              <p className="text-red-500 text-sm mt-2">{locationError}</p>
            )}

            <button
              onClick={handleUpdate}
              className="w-full bg-[#97571c] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#35261b] transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-6">
            <h2 className="text-xl font-semibold text-[#97571c] mb-4">
              Cart Items
            </h2>
            {loading ? (
              <p className="text-gray-600">Loading cart...</p>
            ) : cart && cart.length > 0 ? (
              <>
                <div className="mt-4 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-center gap-4"
                    >
                      <Link href={`/products/${item.productId._id}`}>
                        <img
                          src={item.productId.images}
                          alt={item.productId.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                        />
                      </Link>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-[#97571c]">
                          {item.productId.name}
                        </h2>
                        <p className="text-gray-700">
                          ₹{item.price} x {item.quantity}
                        </p>
                        <p className="text-gray-800 font-medium">
                          Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-lg font-semibold text-[#97571c]">
                  Total Amount: ₹{totalAmount.toFixed(2)}
                </div>
                <button
                  onClick={paymentHandler}
                  className="w-full bg-[#97571c] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#35261b] transition-all duration-200 mt-4"
                >
                  Pay ₹{totalAmount.toFixed(2)}
                </button>
                {paymentError && (
                  <p className="text-red-500 text-sm mt-2">{paymentError}</p>
                )}
              </>
            ) : (
              <p className="text-gray-600">Cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;