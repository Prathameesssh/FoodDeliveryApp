const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");
const userModel = require("../models/userModel");

const signup = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

module.exports = { signup, login };