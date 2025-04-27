"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const shopDropdownRef = useRef(null);

  const shopCategories = [
    { name: "New Arrivals", href: "/Shop/New-Arrivals" },
    {
      name: "Saree",
      href: "/Shop/category/saree",
      subcategories: [
        { name: "Nuapatna Silk", href: "/Shop/category/nuapatna-silk" },
        { name: "Sambalpuri Silk", href: "/Shop/category/sambalpuri-silk" },
        { name: "Exclusive Cotton", href: "/Shop/category/exclusive-cotton" },
        { name: "Berhampuri Silk", href: "/Shop/category/berhampuri-silk" },
        { name: "Gopalpur Tussar", href: "/Shop/category/gopalpur-tussar" },
        {
          name: "Maniabandha Cotton",
          href: "/Shop/category/maniabandha-cotton",
        },
      ],
    },
    {
      name: "Fashion",
      href: "/Shop/category/fashion",
      subcategories: [
        { name: "Men's Fashion", href: "/Shop/category/mens-fashion" },
        { name: "Dupatta", href: "/Shop/category/dupatta" },
        { name: "Yardages", href: "/Shop/category/yardages" },
      ],
    },
    {
      name: "Jewellery",
      href: "/Shop/category/jewellery",
      subcategories: [
        { name: "Cuttack Tarakasi", href: "/Shop/category/cuttack-tarakasi" },
        { name: "Dhokra of Odisha", href: "/Shop/category/dhokra-of-odisha" },
      ],
    },
    {
      name: "Accessories",
      href: "/Shop/category/accessories",
      subcategories: [
        { name: "Cushion Cover", href: "/Shop/category/cushion-cover" },
        { name: "Laptop Bags", href: "/Shop/category/laptop-bags" },
        { name: "Vanity Pouch", href: "/Shop/category/vanity-pouch" },
        { name: "Coin Pouch", href: "/Shop/category/coin-pouch" },
        { name: "Handbag", href: "/Shop/category/handbag" },
      ],
    },
    {
      name: "Arts & Crafts",
      href: "/Shop/category/arts-crafts",
      subcategories: [
        { name: "Pattachitra", href: "/Shop/category/pattachitra" },
        { name: "Lacquer Craft", href: "/Shop/category/lacquer-craft" },
        {
          name: "Talapatra/Palm leaf",
          href: "/Shop/category/talapatra-palm-leaf",
        },
        { name: "Hand-painted Box", href: "/Shop/category/hand-painted-box" },
        { name: "Terracotta", href: "/Shop/category/terracotta" },
        { name: "Dhokra Art", href: "/Shop/category/dhokra-art" },
      ],
    },
    { name: "Traditional Toys", href: "/Shop/category/traditional-toys" },
    { name: "Home Furnishing", href: "/Shop/category/home-furnishing" },
  ];

  const handleMouseEnter = index => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setOpenSubcategory(index);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setOpenSubcategory(null);
    }, 5000);
    setTimeoutId(id);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isShopOpen &&
        shopDropdownRef.current &&
        !shopDropdownRef.current.contains(event.target)
      ) {
        setIsShopOpen(false);
        setOpenSubcategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isShopOpen, timeoutId]);

  return (
    <div className="relative flex flex-row items-center justify-between bg-[#f0dcc4] md:bg-[#f0dcc4]/80 md:backdrop-blur-sm py-4 px-6 sticky top-0 z-10 shadow-md">
      {/* Pseudo-element for pixelation effect in desktop view */}
      <style jsx>{`
        @media (min-width: 768px) {
          .navbar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: inherit;
            image-rendering: pixelated;
            z-index: -1;
            transform: scale(0.25);
            transform-origin: top left;
          }
        }
      `}</style>

      {/* LOGO */}
      <div className="flex flex-row items-center gap-2 font-bold text-2xl text-gray-800 z-10">
        <span className="text-yellow-500">
          <Link href="/">
            <img
              src="/Odisha_Potli_Logo.ico"
              className="w-auto h-16 object-contain"
            />
          </Link>
        </span>
        <Link href="/">
          <span>Odisha Potli</span>
        </Link>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden z-20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-between">
          <span
            className={`w-full h-1 bg-black transform transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></span>
          <span
            className={`w-full h-1 bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-1 bg-black transform transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen
            ? "flex flex-col absolute top-16 left-0 right-0 bg-[#f0dcc4] shadow-md p-4 translate-y-0 opacity-100"
            : "hidden -translate-y-full opacity-0"
        } md:flex md:flex-row md:items-center md:gap-16 md:px-4 md:py-4 md:bg-[#97571c7d] md:rounded-md md:static md:shadow-none md:translate-y-0 md:opacity-100 transition-all duration-300 ease-in-out lg:shadow-lg z-10`}
      >
        <Link
          href="/"
          className="font-semibold text-xl text-black hover:text-[#35261bfa] transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>

        {/* Shop Dropdown */}
        <div className="relative py-2 md:py-0" ref={shopDropdownRef}>
          <button
            className="font-semibold text-xl text-black hover:text-[#35261bfa] transition-colors flex items-center"
            onClick={() => setIsShopOpen(!isShopOpen)}
          >
            Shop
            <svg
              className={`ml-2 w-4 h-4 transform transition-transform ${
                isShopOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`${
              isShopOpen ? "block" : "hidden"
            } md:absolute md:top-full md:left-0 md:mt-2 md:bg-white md:shadow-md md:rounded-md md:p-4 md:w-64`}
          >
            {shopCategories.map((category, index) => (
              <div
                key={category.name}
                className="relative py-1"
                onMouseEnter={() =>
                  category.subcategories && handleMouseEnter(index)
                }
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={category.href}
                    className="font-semibold text-lg text-black block px-2 py-1 hover:text-[#35261bfa] transition-colors flex-1"
                    onClick={() => {
                      setIsOpen(false);
                      setIsShopOpen(false);
                    }}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories && (
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        openSubcategory === index ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="black"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
                {category.subcategories && (
                  <div
                    className={`${
                      openSubcategory === index
                        ? "block opacity-100 translate-x-0"
                        : "hidden opacity-0 translate-x-4"
                    } md:absolute md:top-0 md:left-full md:ml-2 md:bg-white md:shadow-md md:rounded-md md:p-4 md:w-64 transition-all duration-300 ease-in-out`}
                  >
                    {category.subcategories.map(sub => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-2 py-1 text-black hover:text-[#35261bfa] transition-colors text-base"
                        onClick={() => {
                          setIsOpen(false);
                          setIsShopOpen(false);
                          setOpenSubcategory(null);
                        }}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/AboutUs"
          className="font-semibold text-xl text-black hover:text-[#35261bfa] transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          About Us
        </Link>
        <Link
          href="/Blogs"
          className="font-semibold text-xl text-black hover:text-[#35261bfa] transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          Blog
        </Link>
        {/* Mobile menu buttons */}
        <div className="flex lg:flex-col flex-row justify-center items-center gap-4 mt-4 md:hidden">
          {user ? (
            <>
              <Link
                href="/Cart"
                className="font-semibold text-xl text-black px-4 py-2 hover:text-yellow-800 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
              </Link>
              <Link
                href="/Wishlist"
                className="font-semibold text-xl text-black px-4 py-2 hover:text-yellow-800 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="w-6 h-6 mr-2" />
              </Link>
              <Link
                href="/Profile"
                className="font-semibold text-xl text-black px-4 py-2 bg-[#97571c7d] rounded-full transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-6 h-6 lg:mr-2 mr-0" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/SignIn"
                className="font-semibold text-xl text-black px-4 py-2 hover:text-[#35261bfa] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign-In
              </Link>
              <Link
                href="/SignUp"
                className="font-semibold text-xl text-black px-4 py-2 bg-[#97571c7d] rounded-full hover:bg-[#35261bfa] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign-Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Desktop buttons */}
      <div className="hidden md:flex flex-row items-center gap-4 font-semibold text-xl z-10">
        {user ? (
          <>
            <Link
              href="/Cart"
              className="text-black px-4 py-2 hover:text-yellow-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
            </Link>
            <Link
              href="/Wishlist"
              className="text-black px-4 py-2 hover:text-yellow-500 transition-colors"
            >
              <Heart className="w-6 h-6 mr-2" />
            </Link>
            <Link
              href="/Profile"
              className="text-black px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/SignIn"
              className="text-black px-4 py-2 hover:text-[#97571c7d] transition-colors"
            >
              Sign-In
            </Link>
            <Link
              href="/SignUp"
              className="text-black px-4 py-2 bg-[#97571c7d] rounded-full hover:bg-[#8d654afa] transition-colors hover:shadow-lg"
            >
              Sign-Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;