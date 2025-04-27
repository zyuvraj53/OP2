"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard";
import axios from "axios";

const WhoAreWeCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({ delay: 4000 }),
  ]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const addToCart = (id) => setCart((prev) => [...prev, id]);
  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const categories = [
    "nuapatna-silk",
    "sambalpuri-silk",
    "mens-fashion",
    "dupatta",
    "exclusive-cotton",
    "yardages",
    "pattachitra",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productPromises = categories.map((category) =>
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${category}/?limit=1`
          )
        );
        const responses = await Promise.all(productPromises);
        const fetchedProducts = responses.map((res) => res.data.products?.[0] || null);
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="embla relative">
      <div className="embla-wrapper relative mx-auto w-full">
        {/* Left Button */}
        <button
          title="left"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 scale-150 bg-gray-800 text-white rounded-full shadow-md opacity-80 hover:opacity-100 z-[5]"
          onClick={scrollPrev}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Viewport */}
        <div
          className="embla__viewport bg-[#FFF5E4] border lg:py-10 py-10"
          ref={emblaRef}
        >
          <div className="embla__container h-full gap-6">
            {isLoading ? (
              <div className="embla__slide flex items-center justify-center ml-10">
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="embla__slide flex items-center justify-center ml-10">
                <p className="text-red-500">{error}</p>
              </div>
            ) : products.length > 0 ? (
              products.map((product, index) =>
                product ? (
                  <div
                    key={product._id || index}
                    className="embla__slide flex items-center justify-center w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px]"
                  >
                    <div className="rounded-xl overflow-hidden w-full">
                      <ProductCard
                        product={product}
                        cart={cart}
                        wishlist={wishlist}
                        addToCart={addToCart}
                        toggleWishlist={toggleWishlist}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="embla__slide flex items-center justify-center w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px]"
                  >
                    <p className="text-gray-600">
                      No product available for {categories[index]}
                    </p>
                  </div>
                )
              )
            ) : (
              <div className="embla__slide flex items-center justify-center ml-10">
                <p>No products available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Button */}
        <button
          title="right"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 scale-150 bg-gray-800 text-white rounded-full shadow-md opacity-80 hover:opacity-100 z-[5]"
          onClick={scrollNext}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default WhoAreWeCarousel;
