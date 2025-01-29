const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  email: String,
});

module.exports = mongoose.model("productModel", productSchema);