import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";


export default function BlogCard({
  image,
  title,
  description,
  date,
  readTime,
  slug,
  icon,
}) {
  return (
    <Link href={`/Blogs/${slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
          {icon && (
            <div className="absolute top-4 right-4">{icon}</div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-amber-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="text-sm text-gray-500">
            · {date} - {readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}