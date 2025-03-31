import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    }, // URL or path to the blog's main image
    heading: {
      type: String,
      required: true,
      trim: true,
    }, // Main title of the blog
    heading2: {
      type: String,
      required: false,
      trim: true,
    }, // Secondary heading or subtitle (optional)
    author: {
      type: String,
      required: true,
      trim: true,
    }, // Name of the blog author
    date: {
      type: Date,
      required: true,
      default: Date.now,
    }, // Publication date of the blog
    timeToRead: {
      type: Number,
      required: true,
      min: 1,
    }, // Estimated time to read in minutes
    subheadings: [
      {
        type: String,
        trim: true,
      },
    ], // Array of subheadings in the blog
    paragraphs: [
      {
        type: String,
        trim: true,
      },
    ], // Array of paragraphs in the blog
    tags: [
      {
        type: String,
        trim: true,
      },
    ], // Array of tags associated with the blog
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);