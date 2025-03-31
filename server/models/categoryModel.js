import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Category Name
  slug: { type: String, lowercase: true, unique: true }, // URL-friendly name
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }, // Reference to Parent Category (if subcategory)
});

export default mongoose.model("Category", categorySchema);
