import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js"; // Import before using passport
import productRoutes from "./routes/productRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import authRoute from "./routes/authRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoute from "./routes/wishlistRoute.js";
import googleRoute from "./routes/googleRoute.js";
import blogRoute from "./routes/blogRoute.js";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

dotenv.config({ path: "./.env" });

// Connect database
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
    
    credentials: true,
  })
);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Payment Routes
app.post("/api/payment/order", async (req, res) => {
  try {
    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/api/payment/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "Success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

// Session setup

// Routes
app.use("/api/auth", authRoute);
app.use("/", googleRoute);
app.use("/api/product", productRoutes);
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoute);

app.get("/", (req, res) => {
  res.send({ message: process.env.MESSAGE || "Default Welcome" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
