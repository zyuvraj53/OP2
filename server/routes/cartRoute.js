import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  testCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Get user cart
router.get("/", requireSignIn, getCart);

// Add item to cart
router.post("/add", requireSignIn, addToCart);

// Update cart item quantity
router.put("/update", requireSignIn, updateCartItem);

// Remove an item from cart
router.delete("/remove", requireSignIn, removeCartItem);

// Clear the entire cart
router.delete("/clear", requireSignIn, clearCart);
router.get("/test", requireSignIn, testCart);

export default router;
