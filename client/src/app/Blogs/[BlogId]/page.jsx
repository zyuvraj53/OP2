"use client";

import Link from "next/link";
import Image from "next/image";
import { PawPrintIcon as Paw } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export default function BlogPost({ params: paramsPromise }) {
  const params = React.use(paramsPromise); // Unwrap the params Promise
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        console.log(`Fetching blog post with ID: ${params.BlogId}`);
        const response = await axios.get<{ blog}>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${params.BlogId}`,
          { timeout: 10000 } // Set a 10-second timeout
        );
        console.log("API Response:", response.data);
        if (response.data.blog) {
          setPost(response.data.blog);
          setError(null);
        } else {
          console.log("Blog not found in response");
          notFound();
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post: " + (err instanceof Error ? err.message : "Unknown error"));
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.BlogId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return null; // notFound() will have been called
  }

  // Format date for display
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readTime = `${post.timeToRead} minute read`;

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-4 px-4 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
          <Paw className="h-5 w-5" />
          <span className="font-medium">Odisha Potli</span>
        </Link>
      </header>

      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-amber-100">
          <Image
            src="/horizontal_image.jpg"
            alt={post.heading}
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold">{post.heading}</h1>
            <p className="text-xl text-gray-600 mt-2">{post.heading2}</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-sm text-gray-500 mb-8">
          · {formattedDate} - {readTime} · By {post.author}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <article className="prose prose-amber lg:prose-lg max-w-none">
          {post.subheadings.map((subheading, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mt-8 mb-4">{subheading}</h2>
              {post.paragraphs[index] && (
                <p className="mb-4 text-gray-700">{post.paragraphs[index]}</p>
              )}
            </div>
          ))}
          {post.paragraphs.slice(post.subheadings.length).map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
          ))}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}