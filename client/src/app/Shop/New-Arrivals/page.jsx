"use client";

import React, { useState, useEffect } from "react";
import { Star, Star as StarFilled } from "lucide-react";
import { Range } from "react-range";
import Navbar from "../../(components)/Navbar";
import axios from "axios";
import ProductCard from "../../(components)/ProductCard";
import SearchBar from "../../(components)/SearchBar";

// Function to calculate min and max prices from products
const getPriceRange = products => {
  if (!products || products.length === 0) return [0, 600];
  const prices = products.map(product => product.actualPrice);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));
  return [minPrice, maxPrice];
};

export default function NewArrivalsPage() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [sortByPriceLowHigh, setSortByPriceLowHigh] = useState(false); // Low to High
  const [sortByPriceHighLow, setSortByPriceHighLow] = useState(false); // High to Low
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Handlers
  const addToCart = id => setCart(prev => [...prev, id]);
  const toggleWishlist = id =>
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );

  // Fetch products and set dynamic price range
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/new`)
      .then(res => {
        const products = res.data.products;
        setData(products);
        setError(null);
        const [minPrice, maxPrice] = getPriceRange(products);
        setPriceRange([minPrice, maxPrice]);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setData(null);
      });
  }, []);

  // Filter and sort products
  const filteredProducts = data
    ?.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      selectedRating ? product.ratings.average >= selectedRating : true
    )
    .filter(
      product =>
        product.actualPrice >= priceRange[0] &&
        product.actualPrice <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortByPopularity) return b.ratings.average - a.ratings.average;
      if (sortByPriceLowHigh) return a.actualPrice - b.actualPrice; // Low to High
      if (sortByPriceHighLow) return b.actualPrice - a.actualPrice; // High to Low
      return 0;
    });

  const [minPrice, maxPrice] = data ? getPriceRange(data) : [0, 600];

  return (
    <>
      <Navbar />
      <div>
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden fixed bottom-4 right-4 bg-[#97571c] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#35261b] transition-all duration-200 z-50"
          >
            {isFilterOpen ? "Close Filters" : "Apply Filters"}
          </button>

          {/* Sidebar/Filters */}
          <aside
            className={`${
              isFilterOpen
                ? "fixed top-16 left-0 right-0 bottom-0 z-40 bg-[#f0dcc4] p-6 pt-8 mt-6 overflow-y-auto"
                : "hidden"
            } md:block w-full md:w-72 p-6 shadow-2xl bg-[#f0dcc4] md:fixed md:top-[7rem] md:h-[calc(100vh - 7rem)]`}
          >
            <h2 className="text-3xl font-bold text-[#97571c] mb-6">Filters</h2>

            {/* Star Rating Chooser */}
            <div className="mb-16 mt-8">
              <h3 className="text-xl font-semibold text-[#97571c] mb-6">
                Minimum Rating
              </h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() =>
                      setSelectedRating(star === selectedRating ? null : star)
                    }
                    className="focus:outline-none"
                    aria-label={`Filter by ${star} stars`}
                  >
                    {star <= (selectedRating || 0) ? (
                      <StarFilled
                        size={24}
                        fill="#d99527"
                        className="text-[#d99527]"
                      />
                    ) : (
                      <Star size={24} className="text-[#eca72f]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Pointer Price Slider */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-[#97571c] mb-6">
                Price Range
              </h3>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
              <Range
                values={priceRange}
                step={1}
                min={minPrice}
                max={maxPrice}
                onChange={values => setPriceRange([values[0], values[1]])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 bg-gray-200 rounded-full"
                    style={{ ...props.style }}
                  >
                    <div
                      className="h-2 bg-[#97571c] rounded-full"
                      style={{
                        width: `${
                          ((priceRange[1] - priceRange[0]) /
                            (maxPrice - minPrice)) *
                          100
                        }%`,
                        marginLeft: `${
                          ((priceRange[0] - minPrice) / (maxPrice - minPrice)) *
                          100
                        }%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    key={index}
                    className="h-5 w-5 bg-[#97571c] rounded-full focus:outline-none shadow"
                    style={{ ...props.style }}
                  />
                )}
              />
            </div>

            {/* Sorting Checkboxes */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-[#97571c] mb-6">
                Sort By
              </h3>

              {/* Popularity Checkbox */}
              <label className="flex items-center mb-4 checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={sortByPopularity}
                  onChange={() => {
                    setSortByPopularity(!sortByPopularity);
                    setSortByPriceLowHigh(false);
                    setSortByPriceHighLow(false);
                  }}
                  className="hidden"
                />
                <span className="relative block w-10 h-10 bg-[#97571c] rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl active:scale-90">
                  <span className="absolute top-1/2 left-0 right-0 w-6 h-6 mx-auto bg-[#f0dcc4] rounded-full shadow-inner transform -translate-y-1/2 transition-all duration-200 hover:w-5 hover:h-5"></span>
                  <span className="tick_mark absolute top-[-1px] left-[-2px] w-6 h-6 transform rotate-[-40deg]">
                    <span className="absolute left-0 bottom-0 w-1 h-3 bg-[#f0dcc4] rounded opacity-0 transition-all duration-200"></span>
                    <span className="absolute left-0 bottom-0 w-6 h-1 bg-[#f0dcc4] rounded opacity-0 transition-all duration-200"></span>
                  </span>
                </span>
                <span className="ml-3 text-gray-800 font-medium">
                  Popularity
                </span>
              </label>

              {/* Price (Low to High) Checkbox */}
              <label className="flex items-center mb-4 checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={sortByPriceLowHigh}
                  onChange={() => {
                    setSortByPriceLowHigh(!sortByPriceLowHigh);
                    setSortByPopularity(false);
                    setSortByPriceHighLow(false);
                  }}
                  className="hidden"
                />
                <span className="relative block w-10 h-10 bg-[#97571c] rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl active:scale-90">
                  <span className="absolute top-1/2 left-0 right-0 w-6 h-6 mx-auto bg-[#f0dcc4] rounded-full shadow-inner transform -translate-y-1/2 transition-all duration-200 hover:w-5 hover:h-5"></span>
                  <span className="tick_mark absolute top-[-1px] left-[-2px] w-6 h-6 transform rotate-[-40deg]">
                    <span className="absolute left-0 bottom-0 w-1 h-3 bg-[#f0dcc4] rounded opacity-0 transition-all duration-200"></span>
                    <span className="absolute left-0 bottom-0 w-6 h-1 bg-[#f0dcc4] rounded opacity-0 transition-all duration-200"></span>
                  </span>
                </span>
                <span className="ml-3 text-gray-800 font-medium">
                  Price (Low to High)
                </span>
              </label>

              {/* Price (High to Low) Checkbox */}
              <label className="flex items-center checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={sortByPriceHighLow}
                  onChange={() => {
                    setSortByPriceHighLow(!sortByPriceHighLow);
                    setSortByPopularity(false);
                    setSortByPriceLowHigh(false);
                  }}
                  className="hidden"
                />
                <span className="relative block w-10 h-10 bg-[#97571c] rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl active:scale-90">
                  <span className="absolute top-1/2 left-0 right-0 w-6 h-6 mx-auto bg-[#f0dcc4] rounded-full shadow-inner transform -translate-y-1/2 transition-all duration-200 hover:w-5 hover:h-5"></span>
                  <span className="tick_mark absolute top-[-1px] left-[-2px] w-6 h-6 transform rotate-[-40deg]">
                    <span className="absolute left-0 bottom-0 w-1 h-3 bg-[#f0dcc4] rounded opacity-0 transition-all duration-200"></span>
                    <span className="absolute left-0 bottom-0 w-6 h-1 bg-[#f0dcc4] rounded opacity-0 transition-all duration-200"></span>
                  </span>
                </span>
                <span className="ml-3 text-gray-800 font-medium">
                  Price (High to Low)
                </span>
              </label>
            </div>

            {/* Apply Filters Button on Mobile */}
            {isFilterOpen && (
              <button
                onClick={() => setIsFilterOpen(false)}
                className="md:hidden w-full bg-[#97571c] text-white p-3 rounded-full hover:bg-[#35261b] transition-all duration-200 mt-4"
              >
                Apply Filters
              </button>
            )}

            <style jsx>{`
              .checkbox-wrapper input[type="checkbox"]:checked + span {
                background-color: #35261b;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
              }

              .checkbox-wrapper input[type="checkbox"]:checked + span .tick_mark:before,
              .checkbox-wrapper input[type="checkbox"]:checked + span .tick_mark:after {
                opacity: 1;
              }

              .checkbox-wrapper input[type="checkbox"]:checked + span:before {
                width: 0;
                height: 0;
              }

              .checkbox-wrapper .tick_mark:before {
                transform: translateY(-17px);
              }

              .checkbox-wrapper .tick_mark:after {
                transform: translateX(20px);
              }

              .checkbox-wrapper input[type="checkbox"]:checked + span .tick_mark:before {
                transform: translate(0);
              }

              .checkbox-wrapper input[type="checkbox"]:checked + span .tick_mark:after {
                transform: translate(0);
              }
            `}</style>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 p-6 bg-[#f0dcc4] md:ml-[18rem]">
            <div className="flex md:flex-row flex-col justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#97571c]">
                New Arrivals
              </h1>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : !data ? (
              <p className="text-gray-600">Loading products...</p>
            ) : filteredProducts?.length === 0 ? (
              <p className="text-gray-600">No products match your filters.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts?.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    cart={cart}
                    wishlist={wishlist}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}