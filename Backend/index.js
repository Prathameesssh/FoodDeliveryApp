const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10MB" }));

const PORT = process.env.PORT || 8080;

//Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//mongoDB connection

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

//schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  image: String,
});

//model
const userModel = mongoose.model("userModel", userSchema);

//api
app.get("/", (req, res) => {
  res.send("sever is running");
});

//api signup
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, image, password, confirmpassword } = req.body;

  try {
    // Check if the passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    } else {
      // Check if the email already exists in the database
      const user = await userModel.findOne({ email });
      if (user) {
        return res.send({ message: "Email ID is already registered" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload image to Cloudinary
        if (image !== "") {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "profile_pictures",
          });

          // Extract Image URL
          const imageUrl = uploadResponse.secure_url;

          // Save user data including image url
          const userData = {
            ...req.body,
            password: hashedPassword,
            image: imageUrl,
          };

          // Create a new user and save it to the database
          const newUser = new userModel(userData);
          await newUser.save();
        } else {
          const userData = {
            ...req.body,
            password: hashedPassword,
          };
          // Create a new user and save it to the database
          const newUser = new userModel(userData);
          await newUser.save();
        }

        return res.send({ message: "Email ID registered successfully" });
      }
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

//api login
app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const loggedInUser = await userModel
          .findOne({ email })
          .select("-password -confirmpassword");
        console.log(loggedInUser);

        return res.send({
          message: "Login is successful",
          alert: true,
          data: loggedInUser,
        });
      } else {
        return res.send({ message: "Password Incorrect!!!!" });
      }
    } else {
      return res.send({ message: "Email is not registered" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

//product section

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  email: {
    type: String,
  },
});

const productModel = mongoose.model("productModel", productSchema);

app.post("/newproduct", async (req, res) => {
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
});

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//Cart

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("cartModel", cartSchema);

app.post("/AddToCart", async (req, res) => {
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
});

app.get("/cart", async (req, res) => {
  const { email } = req.query;
  console.log(email);
  try {
    const cartItems = await cartModel.find({ email }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart items", error });
  }
});

app.delete("/cart/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const deletedItem = await cartModel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
});

app.listen(PORT, () => console.log("server is running on port :" + PORT));
