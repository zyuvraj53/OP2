import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jisdbiuusdbf";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "jsdfoisncsdncoi";
const refreshTokens = new Set(); // Store refresh tokens temporarily

export const register = async (req, res) => {
  try {
    const { uid, name, email, password, sex, address, role } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      uid,
      name,
      email,
      password: hashedPassword,
      sex,
      address,
      role,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        uid: newUser.uid,
        name: newUser.name,
        email: newUser.email,
        sex: newUser.sex,
        address: newUser.address,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { uid: user.uid, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign({ uid: user.uid }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    refreshTokens.add(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax for localhost
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token || !refreshTokens.has(token)) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid token" });
      }

      const accessToken = jwt.sign(
        { uid: user.uid, role: user.role },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1day
      });

      res.status(200).json({ success: true, message: "Token refreshed" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const logout = (req, res) => {
  // Clear cookies with explicit options
  res.clearCookie("accessToken", {
    httpOnly: true, // Match original cookie settings
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax for localhost
    path: "/", // Ensure path matches how it was set
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax for localhost
    path: "/",
  });
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax for localhost
    path: "/",
  });

  res.status(200).json({ success: true, message: "Logout successful" });
};

export const updateUser = async (req, res) => {
  try {
    const { name, sex, address } = req.body;
    const user = await User.findOne({ email: req.user.email }); // Find by email

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.sex = sex || user.sex;
    user.address = address || user.address;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.cookies.authToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ uid: decoded.uid }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        images: user.images,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Token expired"
          : error.name === "JsonWebTokenError"
          ? "Invalid token"
          : "Server error",
      error: error.message,
    });
  }
};

// import sendEmail from "../helpers/authHelper.js ";

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ msg: "User not found" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "15m",
//   });
//   const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

//   await sendEmail(
//     email,
//     "Reset Password",
//     `<a href="${resetLink}">Reset your password</a>`
//   );
//   res.json({ msg: "Password reset link sent" });
// };

// export const resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
//     res.json({ msg: "Password reset successful" });
//   } catch {
//     res.status(400).json({ msg: "Invalid or expired token" });
//   }
// };
