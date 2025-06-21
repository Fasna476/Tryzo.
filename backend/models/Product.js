const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  sizes: [String],
  brand: {type: String},
  stock: { type: Number, required: true, default: 1 },
  image: {type: String},
  tryOneImage:  { type: String, required: false }
});

module.exports = mongoose.model("Product", ProductSchema);
