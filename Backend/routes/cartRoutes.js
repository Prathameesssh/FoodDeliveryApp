const express = require("express");
const { getCartItems, addToCart, removeCartItem } = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCartItems);
router.post("/add", addToCart);
router.delete("/:itemId",removeCartItem);

module.exports = router;
