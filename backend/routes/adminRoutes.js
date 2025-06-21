const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const productController = require("../controllers/productController");
const isAdmin = require("../middleware/isAdmin"); // optional
const { getAnalytics } = require("../controllers/adminController");

// // Admin product routes
router.post("/product/add", isAdmin,  adminController.addProduct);
router.get("/products",  isAdmin,  adminController.getAllProducts);
router.delete("/product/:id",  isAdmin,  adminController.deleteProduct);

router.get("/analytics", getAnalytics);


module.exports = router;
