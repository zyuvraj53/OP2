"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Star, Star as StarFilled, ShoppingCart, Heart, Heart as HeartFilled } from "lucide-react";
import Navbar from "../../../(components)/Navbar"
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import toast from "react-hot-toast";
import slugify from "slugify";
import ProductCard from "../../../(components)/ProductCard";
import { useRouter } from 'next/navigation';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

export default function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [currentStock, setCurrentStock] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!productId) {
            setError("No Product ID provided in the URL");
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const productResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/product`
                );

                if (productResponse.data.success) {
                    const foundProduct = productResponse.data.products.find((p) => p._id === productId);
                    if (foundProduct) {
                        setProduct(foundProduct);
                        setMainImage(foundProduct.images[0]);
                        setCurrentStock(foundProduct.stock);

                        const categorySlug = slugify(foundProduct.category.name, { lower: true });

                        const relatedResponse = await axios.get(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${categorySlug}`
                        );

                        if (relatedResponse.data.success) {
                            const filteredRelated = relatedResponse.data.products
                                .filter((p) => p._id !== productId)
                                .slice(0, 4);
                            setRelatedProducts(filteredRelated);
                        }

                        setError(null);
                    } else {
                        setError(`Product with ID ${productId} not found`);
                    }
                } else {
                    setError("API returned success: false");
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Failed to fetch product data");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const isInWishlist = wishlist.some((item) => item._id === product?._id);

    const handleAddToCart = () => {
        if (product && currentStock > 0) {
          addToCart(product._id);
          setQuantity((prev) => prev + 1);
          setCurrentStock((prev) => prev - 1);
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

    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
          setQuantity((prev) => prev - 1);
          setCurrentStock((prev) => prev + 1);
        }
      };

    const handleWishlistToggle = () => {
        if (!product) return;

        if (isInWishlist) {
            removeFromWishlist(product._id);
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

    if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10 text-lg">{error}</div>;
    if (!product) return <div className="text-red-500 text-center mt-10 text-lg">No product data available</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-3/4 flex flex-col gap-8">
                        {/* Top Section: Main Image, Thumbnails, and Product Details */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Left: Main Image and Thumbnails */}
                            <div className="lg:w-2/3 flex flex-col gap-4">
                                <div className="w-full">
                                    <img
                                        src={mainImage || product.images[0]}
                                        alt={product.name}
                                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex flex-row gap-2 overflow-x-auto">
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md cursor-pointer border-2 ${mainImage === image ? "border-[#d99527]" : "border-gray-200"
                                                } hover:border-[#eca72f] transition-colors`}
                                            onClick={() => setMainImage(image)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right: Product Details */}
                            <div className="lg:w-1/3 flex flex-col gap-6">
                                <h1 className="text-2xl sm:text-3xl font-bold text-[#d99527]">{product.name}</h1>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1 text-[#d99527]">
                                        {[...Array(5)].map((_, i) =>
                                            i < Math.floor(product.ratings.average) ? (
                                                <StarFilled key={i} size={18} fill="#d99527" />
                                            ) : (
                                                <Star key={i} size={18} />
                                            )
                                        )}
                                    </div>
                                    <span className="text-gray-700 text-sm">
                                        ({product.ratings.average} / 5, {product.ratings.count} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xl sm:text-2xl font-semibold text-[#eca72f]">
                                        ${product.price}
                                    </span>
                                    {product.cutPrice > product.price && (
                                        <span className="text-md sm:text-lg text-gray-500 line-through">
                                            ${product.cutPrice}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        {quantity === 0 ? (
                                            <button
                                                onClick={handleAddToCart}
                                                className="w-full bg-[#d99527] text-white py-2 rounded-md hover:bg-[#eca72f] transition-colors flex items-center justify-center gap-2"
                                                disabled={currentStock === 0}
                                            >
                                                <ShoppingCart size={18} />
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-center gap-2 bg-[#d99527] p-2 rounded-md">
                                                    <button
                                                        onClick={handleDecreaseQuantity}
                                                        className="text-white hover:bg-[#eca72f] p-1 rounded"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="text-white text-lg font-semibold px-4">{quantity}</span>
                                                    <button
                                                        onClick={handleAddToCart}
                                                        className="text-white hover:bg-[#eca72f] p-1 rounded"
                                                        disabled={currentStock === 0}
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => router.push('/cart')}
                                                    className="w-full bg-[#eca72f] text-white py-2 rounded-md hover:bg-[#d99527] transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingBag size={18} />
                                                    View Cart
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleWishlistToggle}
                                        className="flex-1 bg-[#d99527] text-white py-2 rounded-md hover:bg-[#eca72f] transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isInWishlist ? (
                                            <HeartFilled size={18} className="fill-white" />
                                        ) : (
                                            <Heart size={18} />
                                        )}
                                        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="w-full mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-[#eca72f] mb-4">
                                Ratings & Reviews
                            </h2>
                            <div className="max-w-4xl">
                                {product.ratings.reviews.length > 0 ? (
                                    product.ratings.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="border-b border-gray-200 py-4 last:border-b-0"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-gray-700 text-sm sm:text-base">
                                                    {review.user}
                                                </span>
                                                <div className="flex gap-1 text-[#d99527]">
                                                    {[...Array(5)].map((_, i) =>
                                                        i < review.rating ? (
                                                            <StarFilled key={i} size={16} fill="#d99527" />
                                                        ) : (
                                                            <Star key={i} size={16} />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm sm:text-base">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-sm sm:text-base">No reviews yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Related Products - Mobile View */}
                        {relatedProducts.length > 0 && (
                            <div className="lg:hidden mt-8">
                                <h2 className="text-lg sm:text-xl font-semibold text-[#eca72f] mb-4">
                                    Related Products
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {relatedProducts.map((relatedProduct) => (
                                        <ProductCard
                                            key={relatedProduct._id}
                                            product={relatedProduct}
                                            cart={[]}
                                            wishlist={wishlist}
                                            addToCart={addToCart}
                                            toggleWishlist={(id) => {
                                                if (wishlist.includes(id)) {
                                                    removeFromWishlist(id);
                                                } else {
                                                    addToWishlist(id);
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Vertical Separator - Desktop Only */}
                    {relatedProducts.length > 0 && (
                        <div className="hidden lg:block lg:w-px lg:bg-gray-300 lg:mx-4 lg:self-stretch" />
                    )}

                    {/* Related Products - Desktop View */}
                    {relatedProducts.length > 0 && (
                        <div className="hidden lg:block lg:w-1/4">
                            <h2 className="text-lg sm:text-xl font-semibold text-[#eca72f] mb-4">
                                Related Products
                            </h2>
                            <div className="flex flex-col gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard
                                        key={relatedProduct._id}
                                        product={relatedProduct}
                                        cart={[]}
                                        wishlist={wishlist}
                                        addToCart={addToCart}
                                        toggleWishlist={(id) => {
                                            if (wishlist.includes(id)) {
                                                removeFromWishlist(id);
                                            } else {
                                                addToWishlist(id);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}