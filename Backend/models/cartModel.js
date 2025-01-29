const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "productModel", required: true },
    email: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cartModel", cartSchema);