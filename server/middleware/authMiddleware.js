import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "dbdasiufbwebuw";

// ✅ Middleware to verify token (from cookies or headers)
export const requireSignIn = async (req, res, next) => {
  try {
    let token =
      req.cookies.accessToken ||
      req.cookies.authToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    // 🔍 Fetch user from DB using `uid`
    const user = await User.findOne({ uid: decoded.uid }).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    req.user = user; // ✅ Now `req.user._id` is available
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
      error: error.message,
    });
  }
};

// ✅ Middleware to check if user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.uid) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Invalid user session." });
    }

    const user = await User.findOne({ uid: req.user.uid });

    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Admin access required." });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Admin Middleware",
      error: error.message,
    });
  }
};
