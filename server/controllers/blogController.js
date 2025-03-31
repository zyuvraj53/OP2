import Blog from "../models/blogModel.js"; // Updated to import Blog model

// Create a new blog
export const createBlogController = async (req, res) => {
  try {
    const {
      image,
      heading,
      heading2,
      author,
      date,
      timeToRead,
      subheadings,
      paragraphs,
      tags,
    } = req.body;

    // Validation
    if (
      !image ||
      !heading ||
      !author ||
      !date ||
      !timeToRead ||
      !subheadings ||
      !paragraphs ||
      !tags
    ) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be provided",
      });
    }

    const blog = new Blog({
      image,
      heading,
      heading2, // Optional field, no need to enforce
      author,
      date,
      timeToRead,
      subheadings,
      paragraphs,
      tags,
    });

    await blog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error); // Updated log message
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

// Delete a blog
export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting blog", error });
  }
};

// Get all blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error); // Updated log message
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

// Get a single blog by ID
export const getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog:", error); // Updated log message
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching blog",
        error: error.message,
      });
  }
};

// Update a blog by ID
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Blog updated successfully",
        blog,
      });
  } catch (error) {
    console.error("Error updating blog:", error); // Updated log message
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating blog",
        error: error.message,
      });
  }
};