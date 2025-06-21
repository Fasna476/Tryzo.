const Order = require("../models/Order");

// @desc Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user, orderItems, totalAmount } = req.body;
    if (!user) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newOrder = new Order({
      user,
      orderItems,
      totalAmount,
    });
    console.log("Creating order for user:", user);

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("orderItems.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
