"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Cart = () => {
  const { cart } = useCart(); // Get cart data from context
  const { user } = useAuth(); // Get logged-in user from context
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    address: "", // Shipping address
  });

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
    }

    // Log cart object to check its structure
    console.log("Cart data:", cart);

    // Extract and set items state from the cart
    const cartItems = cart.map((item) => ({
      productId: item.productId._id, // Assuming productId is nested under _id
      quantity: item.quantity,
      price: item.price,
    }));
    setItems(cartItems); // Update state with new cart items
  }, [cart, user]);

  // Handle the order submission (async function)
  const handleOrder = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Calculate total amount dynamically based on cart items
      const totalAmount = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Construct order data dynamically from cart items and formData
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod: "COD", // You can adjust this to be dynamic as needed

        shippingAddress: formData.address,
      };

      // Log the orderData for debugging purposes
      console.log("Order Data:", orderData);

      // Make API call to create the order
      const orderRes = await axios.post(
        "http://localhost:8080/api/order/create",
        orderData,
        { withCredentials: true }
      );

      console.log("Order response:", orderRes.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Handle input changes for formData
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        {/* Display the entire cart object as JSON for debugging */}
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </div>
      <div className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white p-4 rounded-lg shadow"
              >
                <p className="text-lg font-medium">
                  Product ID: {item.productId}
                </p>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        )}
        {/* Shipping address form */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your shipping address"
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <button
        onClick={handleOrder}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Place Order
      </button>
    </>
  );
};

export default Cart;
