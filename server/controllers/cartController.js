import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js"; // Ensure Product model is imported
import User from "../models/userModel.js";
// Get user cart
//import Cart from "../models/cartModel.js";
export const getCart = async (req, res) => {
  try {
    console.log("User in getCart:", req.user); // 🔍 Debugging line

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found in request" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.productId"
    );

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
export const testCart = async (req, res) => {
  try {
    console.log("User in getCart:", req.user); // Debugging

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found in request",
      });
    }

    // Fetch user details
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find cart related to user
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.productId"
    );

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Add item to cart
// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Fetch user details
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id }).populate("user");

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price: product.price });
    }

    await cart.save();

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      cart,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart item" });
  }
};

// Remove an item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error removing item from cart" });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing cart" });
  }
};
