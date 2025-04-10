import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/userModel.js"; // Import User model
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { getProfile } from "../controllers/authController.js";
dotenv.config();

const router = express.Router();

// // MongoDB Connection (Ensure MongoDB is running)
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// Session middleware
router.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in DB
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if they don’t exist
          user = new User({
            uid: profile.id,
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            authProvider: "google",
            images: profile.photos.map((photo) => photo.value),
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/SignUp`);
    }

    // 🔹 Generate JWT Token
    const token = jwt.sign({ uid: req.user.uid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 🔹 Store token in HTTP-only Cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    // 🔹 Redirect to Home Page on Success
    res.redirect(process.env.CLIENT_URL);
  }
);

// ✅ Logout & Clear Cookie
router.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.json({ success: true, message: "Logged out successfully" });
});

router.get("/profile", getProfile);

export default router;
