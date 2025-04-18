import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  orderTest,
  getOrdersByUser,
} from "../controllers/orderController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// Test route (Placed before dynamic routes ✅)
router.get("/test", orderTest);

// Create a new order
router.post("/create", requireSignIn, createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get a single order by ID
router.get("/order/:orderId", getOrderById); // Changed to /order/:orderId ✅

// Update order status
router.put("/order/:orderId/status", updateOrderStatus); // Changed ✅

router.get("/orders/user", requireSignIn, getOrdersByUser);
// Delete an order
router.delete("/order/:orderId", deleteOrder); // Changed ✅

export default router;
