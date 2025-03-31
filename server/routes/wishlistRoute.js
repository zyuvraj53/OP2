import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";
import { requireSignIn } from "../middleware/authMiddleware.js"; // Import authentication middleware

const router = express.Router();

// Protected Routes
router.get("/get", requireSignIn, getWishlist);
router.post("/add", requireSignIn, addToWishlist);
router.post("/remove", requireSignIn, removeFromWishlist);
router.post("/clear", requireSignIn, clearWishlist);

export default router;
