import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true, required: true }, // Unique User ID
    googleId: { type: String, unique: true, sparse: true }, // Google OAuth ID (optional)
    name: { type: String, required: true }, // User Name
    email: { type: String, required: true, unique: true }, // Email (Login)
    password: { type: String }, // Password (For credentials-based login)
    images: [{ type: String, required: false }], // User Profile Images
    sex: {
      type: String,
      enum: ["male", "female", "other"],
      set: (value) => value.toLowerCase(),
    },
    address: { type: String, required: false },

    role: { type: String, enum: ["user", "admin"], default: "user" }, // User Roles
    authProvider: {
      type: String,
      enum: ["google", "local"],
      default: "local",
      required: true,
    }, // Authentication type
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
