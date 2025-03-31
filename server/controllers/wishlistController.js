import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";

// ✅ Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "products"
    );
    res
      .status(200)
      .json({ success: true, wishlist: wishlist ? wishlist.products : [] });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to get wishlist",
        error: error.message,
      });
  }
};

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Added to wishlist",
        wishlist: wishlist.products,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to add to wishlist",
        error: error.message,
      });
  }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist)
      return res
        .status(200)
        .json({ success: true, message: "Wishlist is empty" });

    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId
    );
    await wishlist.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Removed from wishlist",
        wishlist: wishlist.products,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to remove from wishlist",
        error: error.message,
      });
  }
};

// ✅ Clear Wishlist
export const clearWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndUpdate({ user: req.user._id }, { products: [] });
    res.status(200).json({ success: true, message: "Wishlist cleared" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to clear wishlist",
        error: error.message,
      });
  }
};
