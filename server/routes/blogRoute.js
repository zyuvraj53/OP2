import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
} from "../controllers/blogController.js"; // Updated to blogController.js

const router = express.Router();

// Create a new blog
router.post("/create", createBlogController);

// Get all blogs
router.get("/", getAllBlogsController);

// Get a single blog by ID
router.get("/:id", getBlogByIdController);

// Update a blog by ID
router.put("/:id", updateBlogController);

// Delete a blog by ID
router.delete("/:id", deleteBlogController);

export default router;