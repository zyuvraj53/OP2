import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// ✅ Create a new product
export const createProductController = async (req, res) => {
  try {
    const {
      pid,
      name,
      description,
      actualPrice,
      stock,
      category,
      brand,
      images,
      fakeRating, // Add fakeRating to destructuring
    } = req.body;

    if (
      !pid ||
      !name ||
      !description ||
      !actualPrice ||
      !category ||
      !brand ||
      !images ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be provided",
      });
    }

    // ✅ Find the category by its slug
    const categoryData = await Category.findOne({ slug: category });

    if (!categoryData) {
      return res.status(400).json({
        success: false,
        error: "Invalid category slug. Please provide a valid slug.",
      });
    }

    // ✅ Create product with ratings.fakeRating
    const product = new Product({
      pid,
      name,
      description,
      actualPrice,
      price: actualPrice,
      stock,
      category: categoryData._id,
      brand,
      images,
      ratings: {
        fakeRating: fakeRating ? Number(fakeRating) : undefined, // Handle optional fakeRating
      },
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// ✅ Update a product by ID
// ✅ Update a product by ID
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, fakeRating, ...updates } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // ✅ Find the category by its slug if provided
    if (category) {
      const categoryData = await Category.findOne({ slug: category });
      if (!categoryData) {
        return res.status(400).json({
          success: false,
          error: "Invalid category slug. Please provide a valid slug.",
        });
      }
      updates.category = categoryData._id; // Use the category's _id
    }

    // ✅ Handle fakeRating update if provided, consistent with create
    if (fakeRating !== undefined) {
      updates.ratings = {
        ...product.ratings,
        fakeRating: fakeRating ? Number(fakeRating) : undefined, // Match create logic
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("category", "name");
    
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Other controllers remain unchanged
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name").lean();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const category = await Category.findOne({
      slug: categorySlug.trim().toLowerCase(),
    });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    let products;
    if (!category.parent) {
      const subcategories = await Category.find({
        parent: category._id,
      }).select("_id");
      const subcategoryIds = subcategories.length
        ? subcategories.map((sub) => sub._id)
        : [];
      products = await Product.find({
        category: { $in: [category._id, ...subcategoryIds] },
      })
        .populate("category", "name slug")
        .lean();
    } else {
      products = await Product.find({ category: category._id })
        .populate("category", "name slug")
        .lean();
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

export const searchController = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const results = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    return res.status(200).json(results);
  } catch (error) {
    console.error("Search Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const getNewProductController = async (req, res) => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setHours(0, 0, 0, 0); // Set time to start of the day

    const products = await Product.find({
      createdAt: { $gte: lastMonth },
    }).populate("category", "name");

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching new products:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching new products",
    });
  }
};

export const getProductByPidController = async (req, res) => {
  try {
    const { pid } = req.body; // Extract pid from request body

    if (!pid) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID (pid) is required" });
    }

    const product = await Product.findOne({ pid });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
