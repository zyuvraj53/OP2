"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "../(components)/Navbar";

const CartPage = () => {
  const { cart, loading, fetchCart, updateCartItem, removeFromCart } = useCart();
  const [stockMap, setStockMap] = useState({});

  // Fetch cart data
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
      }, {});
      setStockMap(newStockMap);
    }
  }, [cart, loading]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    const currentStock = stockMap[productId] || 0;
    const currentQuantity =
      cart.find((item) => item.productId?._id === productId)?.quantity || 0;

    if (newQuantity > currentStock) {
      toast.error("Cannot add more items than available stock!", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#f0dcc4",
          color: "#744d20",
          border: "2px solid #97571c",
        },
      });
      return;
    }

    if (currentStock === 1 && newQuantity < currentQuantity) {
      removeFromCart(productId);
      toast.success("Item removed from cart!", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#f0dcc4",
          color: "#744d20",
          border: "2px solid #97571c",
        },
      });
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast.success("Item removed from cart!", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#f0dcc4",
          color: "#744d20",
          border: "2px solid #97571c",
        },
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
    <div className="flex flex-col bg-[#e8c49c] min-h-screen">
      <Navbar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto bg-[#f0dcc4] p-6 rounded-lg shadow-lg border-2 border-[#97571c]">
          <h1 className="text-3xl md:text-4xl font-bold text-[#97571c] mb-6">
            Your Cart
          </h1>

          {loading ? null : cart.length > 0 ? (
            <>
              <div className="space-y-6">
                {cart.map((item) => {
                  const productId = item.productId?._id;
                  const currentStock =
                    stockMap[productId] || item.productId?.stock || 0;

                  // Don't render items with 0 stock
                  if (currentStock <= 0) {
                    return null;
                  }

                  return (
                    <div
                      key={item._id}
                      className="bg-[#f0dcc4] p-4 rounded-lg shadow-md border-2 border-[#97571c] flex flex-col sm:flex-row items-center gap-4"
                    >
                      <Link href={`/products/${item._id}`}>
                        {item.productId && item.productId.images ? (
                          <img
                            src={item.productId.images[0]}
                            alt={item.productId.name || "Product Image"}
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md cursor-pointer"
                          />
                        ) : (
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#e6c39a] flex items-center justify-center rounded-md">
                            <span className="text-[#744d20] text-sm">
                              No Image
                            </span>
                          </div>
                        )}
                      </Link>

                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-[#97571c]">
                          {item.productId
                            ? item.productId.name
                            : "Unknown Product"}
                        </h2>
                        <p className="text-[#744d20]">
                          {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(productId, item.quantity - 1)
                          }
                          className="p-1 bg-[#97571c] text-white rounded-full hover:bg-[#35261b] transition-colors hover:shadow-lg"
                        >
                          -
                        </button>
                        <span className="text-[#744d20]">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(productId, item.quantity + 1)
                          }
                          className="p-1 bg-[#97571c] text-white rounded-full hover:bg-[#35261b] transition-colors hover:shadow-lg"
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
                            style: {
                              background: "#f0dcc4",
                              color: "#744d20",
                              border: "2px solid #97571c",
                            },
                          });
                        }}
                        className="p-2 bg-[#97571c] text-white rounded-md hover:bg-[#35261b] transition-colors hover:shadow-lg"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              {cart.filter(
                (item) =>
                  (stockMap[item.productId?._id] || item.productId?.stock || 0) >
                  0
              ).length > 0 ? (
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xl font-semibold text-[#97571c]">
                    Total: $
                    {cart
                      .reduce((total, item) => total + item.price * item.quantity, 0)
                      .toFixed(2)}
                  </div>
                  <Link
                    href="/checkout"
                    className="bg-[#97571c] text-white py-3 px-8 rounded-lg hover:bg-[#35261b] transition-colors hover:shadow-lg text-lg font-semibold"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              ) : (
                <div className="text-center mt-8">
                  <p className="text-lg text-[#744d20] mb-4">
                    Your cart is empty.
                  </p>
                  <Link
                    href="/Shop"
                    className="bg-[#97571c] text-white py-3 px-6 rounded-lg hover:bg-[#35261b] transition-colors hover:shadow-lg text-lg font-semibold"
                  >
                    Shop Now
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-[#744d20] mb-4">Your cart is empty.</p>
              <Link
                href="/Shop"
                className="bg-[#97571c] text-white py-3 px-6 rounded-lg hover:bg-[#35261b] transition-colors hover:shadow-lg text-lg font-semibold"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;