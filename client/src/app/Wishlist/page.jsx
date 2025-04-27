"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../(components)/ProductCard";
import Navbar from "../(components)/Navbar";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#d99527] mb-6">
            Your Wishlist
          </h1>

          {wishlist.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((item) => (
                  <ProductCard
                    key={item._id}
                    product={{
                      _id: item._id,
                      pid: item._id, // Use _id as fallback since pid might not exist
                      name: item.name,
                      description: item.description || "No description available",
                      actualPrice: item.price, // Use price as fallback if actualPrice is missing
                      price: item.price,
                      cutPrice: item.cutPrice || item.price, // Use price if no discount
                      stock: item.stock || 1, // Default to 1 if not provided
                      category: item.category || "Uncategorized",
                      brand: item.brand || "Unknown Brand",
                      images: item.images || ["/placeholder-image.jpg"], // Fallback image
                      createdAt: item.createdAt || new Date().toISOString(),
                      updatedAt: item.updatedAt || new Date().toISOString(),
                      ratings: {
                        average: item.ratings?.average || 0,
                        count: item.ratings?.count || 0,
                        reviews: item.ratings?.reviews || [],
                      },
                    }}
                  />
                ))}
              </div>

            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">Your wishlist is empty.</p>
              <Link
                href="/Shop"
                className="bg-[#d99527] text-white py-3 px-6 rounded-md hover:bg-[#eca72f] transition-colors text-lg font-semibold"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}