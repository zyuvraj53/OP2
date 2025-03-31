import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    pid: { type: String, unique: true, required: true }, // Unique Product ID
    name: { type: String, required: true }, // Product Name
    description: { type: String, required: true }, // Product Details

    actualPrice: { type: Number, required: true }, // Original Price
    cutPrice: { type: Number }, // Discounted Price (Defaults to actualPrice + 30%)
    price: { type: Number, required: true }, // Final Selling Price

    stock: { type: Number }, // Available Stock
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }, // Linked to Category
    brand: { type: String, required: true }, // Brand Name
    images: [{ type: String, required: false }], // Array of Image URLs

    ratings: {
      fakeRating: { type: Number, min: 1, max: 5, default: null }, // Manually set rating
      average: { type: Number, default: 0 }, // Average Rating
      count: { type: Number, default: 0 }, // Number of Users Who Rated
      reviews: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rating: { type: Number, min: 1, max: 5, required: true }, // User's Star Rating
          review: { type: String }, // User's Review
          createdAt: { type: Date, default: Date.now }, // Review Date
        },
      ],
    },
  },
  { timestamps: true }
);

// Automatically calculate cutPrice before saving
ProductSchema.pre("save", function (next) {
  if (!this.isModified("actualPrice")) return next();
  this.cutPrice = this.actualPrice + this.actualPrice * 0.3;
  next();
});

// Set the displayed average rating (fake if provided)
// ProductSchema.virtual("displayRating").get(function () {
//   return this.ratings.fakeRating !== null
//     ? this.ratings.fakeRating
//     : this.ratings.average;
// });

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
