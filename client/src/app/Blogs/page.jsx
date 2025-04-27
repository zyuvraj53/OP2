"use client";

import Image from "next/image";
import { PawPrintIcon as Paw } from "lucide-react";
import BlogCard from "../(components)/blog-card";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../(components)/Navbar";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog`
        );
        setBlogs(response.data.blogs);
        setError(null);
      } catch (err) {
        setError("Failed to fetch blog posts");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Navbar/>

      {/* Hero Section */}
      <section className="container mx-auto mt-4">
        <div className="relative flex flex-col md:flex-row items-start md:items-end gap-6 p-6 md:p-12">
          <div className="flex-1 flex bg-white flex-col justify-center z-10 lg:-mr-48 lg:mt-48">
            <h1 className="lg:text-8xl font-bold md:text-5xl text-black">Our Blog</h1>
            <p className="mt-4 lg:text-4xl text-gray-800">
              Research and recommendations for modern stack websites.
            </p>
          </div>
          <div className="relative w-full md:w-[800px] h-[400px] -mt-12 md:mt-0 md:-mb-12">
            <Image
              src="/horizontal_image.jpg"
              alt="Person with sparkler"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-gray-600 text-center">Loading blog posts...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-600 text-center">No blog posts found.</p>
        ) : (
          <div className="container mx-auto mt-12 p-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogs.map((post) => (
                <BlogCard
                  key={post._id}
                  image="/horizontal_image.jpg"
                  title={post.title}
                  description={post.subtitle}
                  date={post.date}
                  readTime={post.readTime}
                  slug={post._id}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}