import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { requireSignIn } from "../middleware/authMiddleware.js"; // Import middleware

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress } = req.body;
    const user = req.user._id; // Get the user from the middleware

    // Validate products & calculate totalAmount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid product ID" });
      }

      // Check if there is enough stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Not enough stock for ${product.name}`,
        });
      }

      // Reduce stock of the product
      product.stock -= item.quantity;
      await product.save();
      console.log("product stock updated");

      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      user: user._id, // Ensure that user is saved as the user's ID
      items,
      totalAmount,
      paymentMethod,
      shippingAddress,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    await order.save();

    console.log("order saved");

    console.log(order);

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

// Apply the requireSignIn middleware to your route (e.g., in your routes file)
// e.g., app.post("/api/orders", requireSignIn, createOrder);

// Get orders by user
export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user._id; // Use user from middleware

    const orders = await Order.find({ user: userId })
      .populate("items.productId", "name price images") // Populate product info
      .populate("user", "name email "); // Populate user info

    if (!orders || orders.length === 0) {
      return res.status(200).json({ success: true, orders: [] });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.productId", "name price");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("items.productId", "name price");

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

export const orderTest = async (req, res) => {
  res.status(200).json({ success: true, message: "Order test successful" });
};
