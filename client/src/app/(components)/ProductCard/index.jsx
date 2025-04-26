"use client";

import React, { useState } from "react";
import {
  Star,
  Star as StarFilled,
  ShoppingCart,
  Heart,
  Heart as HeartFilled,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [currentStock, setCurrentStock] = useState(product.stock);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const isWishlistPage = pathname === "/Wishlist";

  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleAddToCart = e => {
    e.preventDefault();
    if (currentStock > 0) {
      addToCart(product._id);
      setCurrentStock(prevStock => prevStock - 1);
      toast.success(`${product.name} has been added to your cart!`, {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #d99527",
        },
      });
    }
  };

  const handleWishlistToggle = e => {
    e.preventDefault();

    if (isInWishlist) {
      removeFromWishlist(product._id);
      if (isWishlistPage) {
        setIsVisible(false);
      }
      toast.success(`${product.name} removed from wishlist!`, {
        duration: 2000,
        position: "top-right",
      });
    } else {
      addToWishlist(product._id);
      toast.success(`${product.name} added to wishlist!`, {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  if (!isVisible && isWishlistPage) {
    return null;
  }

  return (
    <Link href={`/Shop/product/${product._id}`}>
      <div className="bg-[#e6c39a] p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out border border-gray-200 cursor-pointer relative">
        <div className="relative">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-72 object-cover rounded-md mb-4"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
          )}
          {currentStock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gray-600 bg-opacity-20 text-white px-4 py-2 rounded-md text-lg font-semibold">
                Out of Stock
              </span>
            </div>
          )}

          <motion.button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-1"
            whileTap={{ scale: 0.9 }}
          >
            {isInWishlist ? (
              <HeartFilled
                size={24}
                className="text-red-500 fill-red-500 transition-colors"
              />
            ) : (
              <Heart
                size={24}
                className="text-gray-500 fill-none transition-colors"
              />
            )}
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-[#744d20] text-xl">₹{product.price}</p>
          {product.cutPrice && (
            <p className="text-[#bf8d5b] line-through text-md">
              ₹{product.cutPrice}
            </p>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-[#97571c]">
          {product.name}
        </h2>

        <div className="flex gap-1 text-[#744d20] mt-2 mb-4">
          {[...Array(5)].map((_, i) =>
            i < Math.round(product.ratings.average) ? (
              <StarFilled key={i} size={20} fill="#744d20" />
            ) : (
              <Star key={i} size={20} />
            )
          )}
          <span className="text-[#744d20] text-md ml-2">
            {product.ratings.count === 0
              ? "(No Reviews)"
              : `(${product.ratings.count}) reviews`}
          </span>
        </div>

        <div className="mt-2 mb-4 text-[#744d20]">
          Odisha-Potli
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#97571c] text-white py-2 rounded-md hover:bg-[#744d20] hover:scale-105 transition-all duration-200 ease-in-out flex items-center justify-center gap-2"
            disabled={currentStock === 0}
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
