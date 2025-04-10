import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getNewProductController,
  getProductByIdController,
  updateProductController,
  getProductByPidController,
  getProductsByCategory,
  searchController,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProductController); // Create product
// Get all products
router.get("/", getAllProductsController);
router.get("/new", getNewProductController);
router.post("/pid", getProductByPidController);

// Get a single product by ID
router.get("/:id", getProductByIdController);

// Update a product by ID
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController); // Delete product by ID
router.get("/category/:categorySlug", getProductsByCategory);
router.post("/search", searchController);

export default router;
