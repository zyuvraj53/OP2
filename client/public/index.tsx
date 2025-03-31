import React from "react";
import Image from "next/image";

interface Order {
  _id: string;
  productImage: string;
  productPrice: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-md"
        >
          <div className="w-20 h-20 flex-shrink-0">
            <Image
              src={order.productImage}
              alt="Product"
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1">
            <p className="text-[#d99527] font-semibold">${order.productPrice.toFixed(2)}</p>
            <p className="text-gray-600 text-sm">
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Shipped"
                    ? "text-blue-600"
                    : order.status === "Pending"
                    ? "text-[#eca72f]"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}