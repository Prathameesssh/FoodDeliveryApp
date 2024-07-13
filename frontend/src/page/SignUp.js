import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../utility/ImageToBase64.js";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  console.log(data);

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    try {
      const data = await ImageToBase64(file);
      setData((preve) => {
        return {
          ...preve,
          image: data,
        };
      });
    } catch (error) {
      console.error("Error converting image to base64", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmpassword } = data;
    if (firstName && email && password && confirmpassword) {
      if (password === confirmpassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        console.log("DataRes:", dataRes);
        //alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.message === "Email ID registered successfully") {
          navigate("/login", { state: { imageUrl: data.image } });
        }
      } else {
        toast("password and confirm password is not same");
      }
    } else {
      toast("Required fields cannot be empty");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        {/*<h1 className="text-center text-2xl ">Sign up</h1>*/}
        <div className="m-auto w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative">
          <img
            src={data.image ? data.image : loginSignupImage}
            className="w-full h-full"
          />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center">
              <p className="text-sm p-1 text-white cursor-pointer">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              name="image"
              className="hidden"
              accept="image/*"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="w-full bg-slate-200 px-2 py-1 mt-1 mb-2 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleonChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="w-full bg-slate-200 px-2 py-1 mt-1 mb-2 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleonChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="w-full bg-slate-200 px-2 py-1 mt-1 mb-2 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleonChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleonChange}
            />
            <span className="flex text-xl" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className="w-full bg-slate-200 border-none outline-none "
              value={data.confirmpassword}
              onChange={handleonChange}
            />
            <span className="flex text-xl" onClick={handleConfirmShowPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            className="w-full max-w-[120px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-2">
          Already hane account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
