const productModel = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");

const getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const addProduct = async (req, res) => {
try {
    console.log(req.body);
    const { name, category, image, price, description, email } = req.body;
    if (email) {
      if (name && category && image && price && description) {
        //uploading image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "product_pictures",
        });

        // Extract Image URL
        const imageUrl = uploadResponse.secure_url;

        // Save user data including image url
        const userData = {
          ...req.body,
          image: imageUrl,
        };

        // Create a new user and save it to the database
        const newUser = new productModel(userData);
        await newUser.save();

        return res.status(201).send({ message: "Data Uploaded Successfully" });
      } else {
        res.status(404).send({ message: "required fields are empty" });
      }
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { getAllProducts, addProduct };