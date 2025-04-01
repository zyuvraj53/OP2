import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    }, // User Reference
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number },
      },
    ], // Ordered Products

    totalAmount: { type: Number, required: true }, // Total Order Amount
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    }, // Order Status

    paymentMethod: {
      type: String,
      enum: ["COD", "Credit Card", "RazorPay"],
      required: true,
    }, // Payment Method
    transactionId: { type: String }, // Transaction ID (For online payments)

    shippingAddress: { type: String, required: true }, // Delivery Address
    orderedAt: { type: Date, default: Date.now }, // Order Date
    estimatedDelivery: { type: Date }, // Estimated Delivery Date
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
