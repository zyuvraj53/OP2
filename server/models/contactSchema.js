import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"], // Basic phone number validation
    unique: true, // Ensures no duplicate phone numbers
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Basic email validation
    maxlength: [255, "Email cannot exceed 255 characters"],
    unique: true, // Ensures no duplicate emails
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Export the model, reusing existing model if it exists
export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);