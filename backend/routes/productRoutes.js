// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Product routes
router.post("/add", upload.single("image"),productController.createProduct);         // Create a new product
router.get("/all", productController.getAllProducts);         // Get all products
router.get("/:id", productController.getProductById);         // Get product by ID
router.put("/update/:id", upload.single("image"), productController.updateProduct);   // Update product
router.delete("/delete/:id", productController.deleteProduct); // Delete product

module.exports = router;
