"use client";

import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart, Heart as HeartFilled, Eye, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ProductCard({ product }) {
    const { addToCart, removeFromCart, updateCartItem, cart } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const [currentStock, setCurrentStock] = useState(product.stock);
    const pathname = usePathname();
    const isWishlistPage = pathname === "/Wishlist";
    const isInWishlist = wishlist.some((item) => item._id === product._id);

    const cartItem = cart.find((item) => item.productId === product._id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;
    const [showCounter, setShowCounter] = useState(cartQuantity > 0);
    const [localQuantity, setLocalQuantity] = useState(cartQuantity);

    useEffect(() => {
        setLocalQuantity(cartQuantity);
    }, [cartQuantity]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentStock > 0) {
            try {
                await addToCart(product._id, 1);
                setCurrentStock((prevStock) => prevStock - 1);
                setShowCounter(true);
                toast.success(`${product.name} added to cart!`, {
                    duration: 2000,
                    position: "top-right",
                });
            } catch (error) {
                toast.error("Failed to add to cart");
            }
        }
    };

    const handleIncreaseQuantity = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentStock > 0) {
            try {
                const newQuantity = localQuantity + 1;
                setLocalQuantity(newQuantity);
                await updateCartItem(product._id, newQuantity);
                setCurrentStock((prev) => prev - 1);
                toast.success(`${product.name} added to cart!`, {
                    duration: 2000,
                    position: "top-right",
                });
            } catch (error) {
                setLocalQuantity((prev) => prev - 1);
                toast.error("Failed to update cart");
            }
        }
    };

    const handleDecreaseQuantity = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (localQuantity > 0) {
            try {
                const newQuantity = localQuantity - 1;
                setLocalQuantity(newQuantity);
                if (newQuantity === 0) {
                    await removeFromCart(product._id);
                    setShowCounter(false);
                } else {
                    await updateCartItem(product._id, newQuantity);
                }
                setCurrentStock((prev) => prev + 1);
                toast.success(`${product.name} removed from cart!`, {
                    duration: 2000,
                    position: "top-right",
                });
            } catch (error) {
                setLocalQuantity((prev) => prev + 1);
                toast.error("Failed to update cart");
            }
        }
    };

    return (
        <Link href={`/Shop/product/${product._id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 cursor-pointer relative">
                <div className="relative">
                    {product.images.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
                    )}

                    {currentStock === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-md text-lg font-semibold">
                                Out of Stock
                            </span>
                        </div>
                    )}

                    <motion.button
                        onClick={(e) => {
                            e.preventDefault();
                            isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id);
                        }}
                        className="absolute top-2 right-2 p-1"
                        whileTap={{ scale: 0.9 }}
                    >
                        {isInWishlist ? (
                            <HeartFilled size={24} className="text-red-500 fill-red-500" />
                        ) : (
                            <Heart size={24} className="text-gray-500 fill-none" />
                        )}
                    </motion.button>
                </div>

                <h2 className="text-lg font-semibold text-[#eca72f]">{product.name}</h2>
                <p className="text-gray-700 text-lg">₹{product.price}</p>

                <div className="flex gap-1 text-[#d99527] mt-2 mb-4">
                    {[...Array(5)].map((_, i) =>
                        i < Math.round(product.ratings.average) ? (
                            <Star key={i} size={20} fill="#d99527" />
                        ) : (
                            <Star key={i} size={20} />
                        )
                    )}
                    <span className="text-gray-600 text-sm ml-2">({product.ratings.count})</span>
                </div>

                <div className="flex gap-2">
                    {showCounter || cartQuantity > 0 ? (
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center justify-center gap-2 bg-[#d99527] p-2 rounded-md">
                                <button
                                    onClick={handleDecreaseQuantity}
                                    className="text-white hover:bg-[#eca72f] p-1 rounded"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-white text-lg font-semibold px-4">
                                    {localQuantity}
                                </span>
                                <button
                                    onClick={handleIncreaseQuantity}
                                    className="text-white hover:bg-[#eca72f] p-1 rounded"
                                    disabled={currentStock === 0}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <Link
                                href="/cart"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-[#eca72f] text-white py-2 rounded-md hover:bg-[#d99527] transition-colors flex items-center justify-center gap-2"
                            >
                                <Eye size={18} /> View Cart
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-[#d99527] text-white py-2 rounded-md hover:bg-[#eca72f] transition-colors flex items-center justify-center gap-2"
                            disabled={currentStock === 0}
                        >
                            <ShoppingCart size={18} /> Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
}
