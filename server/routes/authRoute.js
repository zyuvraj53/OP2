import express from "express";
import {
  register,
  loginUser,
  refreshToken,
  logout,
  updateUser,
  getProfile,
  // forgetPassword,
  // resetPassword,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/logout", requireSignIn, logout);

// Protected Routes
router.get("/profile", requireSignIn, getProfile);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Welcome to your profile!",
//     user: req.user,
//   });
// });

router.put("/update", requireSignIn, updateUser);

// Admin-Only Route
router.get("/admin-dashboard", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
    user: req.user,
  });
});

export default router;
