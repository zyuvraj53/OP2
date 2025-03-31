import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

// ✅ Create a new category or subcategory
router.post("/", createCategory);

// ✅ Get all categories along with subcategories
router.get("/", getCategories);

export default router;
