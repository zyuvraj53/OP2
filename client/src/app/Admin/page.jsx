"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import axios from "axios";
import { useAuth } from "../../app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image"; // Added Next.js Image component

const categories = [
  "Nuapatna Silk",
  "Sambalpuri Silk",
  "Exclusive Cotton",
  "Berhampuri Silk",
  "Gopalpur Tussar",
  "Maniabandha Cotton",
  "Men's Fashion",
  "Dupatta",
  "Yardages",
  "Cuttack Tarakasi",
  "Dhokra of Odisha",
  "Cushion Cover",
  "Laptop Bags",
  "Vanity Pouch",
  "Coin Pouch",
  "Handbag",
  "Pattachitra",
  "Lacquer Craft",
  "Talapatra/Palm leaf",
  "Hand-painted Box",
  "Terracotta",
  "Dhokra Art",
  "Traditional Toys",
  "Home Furnishing",
];

export default function Admin() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/");
      } else if (user.role !== "admin") {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [user, router]);

  // Fixed Line 85: Added proper typing for Cloudinary result
  const handleUploadSuccess = (result) => {
    if (!result.info || typeof result.info === "string") return;
    const newImage = {
      id: result.info.public_id,
      url: result.info.secure_url,
    };
    setImages((prev) => [...prev, newImage]);
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      setSubmitError("At least one image is required");
      setSubmitSuccess(null);
      return;
    }

    const productData = {
      pid: data.pid,
      name: data.name,
      description: data.description,
      actualPrice: Number(data.actualPrice),
      price: Number(data.price),
      stock: Number(data.stock),
      category: data.category,
      brand: data.brand,
      images: images.map((img) => img.url),
      ratings: {
        fakeRating: Number(data.fakeRating),
      },
    };

    //   try {
    //     // Fixed Line 132: Use the response if needed or remove unused variable
    //     await axios.post("${process.env.NEXT_PUBLIC_API_URL}/api/product/create", productData, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     setSubmitSuccess("Product created successfully!");
    //     setSubmitError(null);
    //     reset();
    //     setImages([]);
    //   } catch (error) {
    //     console.error("Error submitting product:", error);
    //     setSubmitError("Failed to create product. Please try again.");
    //     setSubmitSuccess(null);
    //   }
    try {
      console.log("Sending productData:", JSON.stringify(productData, null, 2));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/create`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setSubmitSuccess("Product created successfully!");
      setSubmitError(null);
      reset();
      setImages([]);
    } catch (error) {
      console.error("Error:", error.response?.status, error.response?.data);
      setSubmitError(
        error.response?.data?.message ||
          "Failed to create product. Please try again."
      );
      setSubmitSuccess(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-row">
      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Add New Product
            </h1>

            {submitSuccess && (
              <p className="text-green-500 text-center mb-4">{submitSuccess}</p>
            )}
            {submitError && (
              <p className="text-red-500 text-center mb-4">{submitError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Form fields remain unchanged until here */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PID
                </label>
                <input
                  {...register("pid", { required: "PID is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                />
                {errors.pid && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pid.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Actual Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("actualPrice", {
                    required: "Actual Price is required",
                    min: { value: 0, message: "Price must be positive" },
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                />
                {errors.actualPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.actualPrice.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Final Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    min: { value: 0, message: "Stock cannot be negative" },
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  {...register("brand", { required: "Brand is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  step="1"
                  {...register("fakeRating", {
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eca72f]"
                />
                {errors.fakeRating && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fakeRating.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <CldUploadWidget
                  uploadPreset="product-image"
                  onSuccess={handleUploadSuccess}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="mt-1 bg-[#eca72f] text-white px-4 py-2 rounded-md hover:bg-[#d99527]"
                    >
                      Add Images
                    </button>
                  )}
                </CldUploadWidget>
                {images.length > 0 && (
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={images.map((img) => img.id)}>
                      <div className="mt-4 space-y-2">
                        {images.map((img) => (
                          <SortableImage
                            key={img.id}
                            id={img.id}
                            url={img.url}
                            onRemove={() => handleRemoveImage(img.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#eca72f] text-white px-4 py-2 rounded-md hover:bg-[#d99527]"
              >
                Save Product
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-4 w-48">
        <button className="bg-[#eca72f] text-white text-center px-6 py-2 rounded-md hover:bg-[#d99527]">
          Create Blog
        </button>
        <button className="bg-[#eca72f] text-white text-center px-6 py-2 rounded-md hover:bg-[#d99527]">
          Set Order Details
        </button>
      </div>
    </div>
  );
}

function SortableImage({ id, url, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Fixed Line 361 & 368: Moved styles to CSS class and replaced img with Next.js Image
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transition || undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md cursor-move"
    >
      <Image
        src={url}
        alt="preview"
        width={64} // Explicit width for Next.js Image
        height={64} // Explicit height for Next.js Image
        className="object-cover rounded"
      />
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        Remove
      </button>
    </div>
  );
}
