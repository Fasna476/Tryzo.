const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/orderController");

router.post("/add", createOrder);       // POST /api/orders/add
router.get("/", getAllOrders);          // GET  /api/orders/

module.exports = router;
