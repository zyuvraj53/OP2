import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

// Ensure unique products per user
WishlistSchema.pre("save", function (next) {
  this.products = [...new Set(this.products.map((p) => p.toString()))];
  next();
});

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);
