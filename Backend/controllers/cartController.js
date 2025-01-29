const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

const getCartItems = async (req, res) => {
  const { email } = req.query;
  console.log(email);
  try {
    const cartItems = await cartModel.find({ email }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart items", error });
  }
};

const addToCart = async (req, res) => {
  try {
    console.log(req.body);
    const { id, email } = req.body;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newCartItem = new cartModel({
      product: product._id,
      email,
    });
    await newCartItem.save();
    res.status(201).json({ message: "Item Added Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const removeCartItem = async (req, res) => {
  const { itemId } = req.params; // Extract the item ID from the URL
  try {
    const deletedItem = await cartModel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

module.exports = { getCartItems, addToCart, removeCartItem };