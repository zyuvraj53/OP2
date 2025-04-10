"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // custom Hook
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "../(components)/Navbar";

const TestPage = () => {
  const { cart, loading, fetchCart, updateCartItem, removeFromCart} = useCart();

  // cart - array of cart items
  // loading - Boolean indicating if the cart data is being fetched
  // updateCartItem - Function to fetch cart data
  // updateCartItem - Function to update item quantity
  // removeFromCart - Function to remove item from cart
  
  const [stockMap, setStockMap] = useState({});

  // State object tracking available for each product, initialized as an empty object.

  // Fetches data whenever fetchCart changes
  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
    };
    fetchData();
  }, [fetchCart]);

  // Initialize stock when cart loads
  useEffect(() => {
    if (!loading && cart.length > 0) {
      const newStockMap = cart.reduce((acc, item) => {
        if (item.productId) {
          acc[item.productId._id] = item.productId.stock || 0;
        }
        return acc;
      }, {} );
      setStockMap(newStockMap);
    }
  }, [cart, loading]);
  // runs when cart or loading changes

  const handleUpdateQuantity = (productId, newQuantity) => {
    const currentStock = stockMap[productId] || 0;
    const currentQuantity = cart.find(item => item.productId?._id === productId)?.quantity || 0;

    if (newQuantity > currentStock) {
      toast.error("Cannot add more items than available stock!", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #d99527",
        },
      });
      return;
    }

    // If current stock is 1 and decreasing, remove the item
    if (currentStock === 1 && newQuantity < currentQuantity) {
      removeFromCart(productId);
      toast.success("Item removed from cart!", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast.success("Item removed from cart!", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      updateCartItem(productId, newQuantity);
      setStockMap((prev) => ({
        ...prev,
        [productId]: currentStock - (newQuantity - currentQuantity),
      }));
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#d99527] mb-6">Your Cart</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading cart...</p>
        ) : cart.length > 0 ? (
          <>
            <div className="space-y-6">
              {cart.map((item) => {
                const productId = item.productId?._id;
                const currentStock = stockMap[productId] || item.productId?.stock || 0;

                // Don't render items with 0 stock
                if (currentStock <= 0) {
                  return null;
                }

                return (
                  <div
                    key={item._id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-center gap-4"
                  >
                    <Link href={`/products/${item._id}`}>
                      {item.productId && item.productId.images ? (
                        <img
                          src={item.productId.images}
                          alt={item.productId.name || "Product Image"}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md cursor-pointer"
                        />
                      ) : (
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 flex items-center justify-center rounded-md">
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}
                    </Link>

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#eca72f]">
                        {item.productId ? item.productId.name : "Unknown Product"}
                      </h2>
                      <p className="text-gray-700">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(productId, item.quantity - 1)}
                        className="p-1 bg-gray-200 rounded-full hover:bg-[#eca72f] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(productId, item.quantity + 1)}
                        className="p-1 bg-gray-200 rounded-full hover:bg-[#eca72f] hover:text-white transition-colors"
                        disabled={currentStock <= item.quantity}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={async () => {
                        await removeFromCart(productId);
                        await fetchCart();
                        toast.success("Item removed from cart!", {
                          duration: 2000,
                          position: "top-right",
                        });
                      }}
                      className="p-2 bg-gray-200 rounded-md hover:bg-[#eca72f] hover:text-white transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {cart.filter(item => (stockMap[item.productId?._id] || item.productId?.stock || 0) > 0).length > 0 ? (
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xl font-semibold text-[#d99527]">
                  Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </div>
                <Link
                  href="/checkout"
                  className="bg-[#d99527] text-white py-3 px-8 rounded-md hover:bg-[#eca72f] transition-colors text-lg font-semibold"
                >
                  Proceed to Checkout
                </Link>
              </div>
            ) : (
              <div className="text-center mt-8">
                <p className="text-lg text-gray-700 mb-4">Your cart is empty.</p>
                <Link
                  href="/Shop"
                  className="bg-[#d99527] text-white py-3 px-6 rounded-md hover:bg-[#eca72f] transition-colors text-lg font-semibold"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">Your cart is empty.</p>
            <Link
              href="/"
              className="bg-[#d99527] text-white py-3 px-6 rounded-md hover:bg-[#eca72f] transition-colors text-lg font-semibold"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TestPage;