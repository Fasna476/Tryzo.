const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category, sizes, brand, stock, image } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      sizes,
      brand,
      stock,
      image
    });
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSalesResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const activeOrders = await Order.countDocuments({ status: "Processing" }); // or "Pending"
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const newUsers = await User.countDocuments({ createdAt: { $gte: lastWeek } });

    res.json({
      totalUsers,
      totalSales: totalSalesResult[0]?.total || 0,
      activeOrders,
      newUsers
    });
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
