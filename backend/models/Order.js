const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: Number,
    }
  ],
  totalAmount: Number,
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
