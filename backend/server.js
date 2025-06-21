require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db.js"); // Import database connection
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes"); // Import product routes
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const tryonRoutes = require('./routes/tryon');
const cors = require("cors");

// Initialize Express
const app = express();
app.use(cors());
// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/uploads/user_images', express.static(path.join(__dirname, 'uploads/user_images')));
app.use("/tryon", tryonRoutes)

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/auth", authRoutes);
app.use("/products", productRoutes); 
app.use("/orders", orderRoutes); 
app.use("/admin", adminRoutes); 
// app.use("/", authRoutes)

// Connect to Database
connectDB();

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Tryzo Backend!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
