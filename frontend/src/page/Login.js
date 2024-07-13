import React, { useState, useEffect } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
//import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice.js";

const Login = () => {
  //const location = useLocation();
  //const imageUrl = location.state?.imageUrl;

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);
  //console.log(userData.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userData); // Log userData whenever it changes
  }, [userData]);

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
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
      toast(dataRes.message);

      if (dataRes.message === "Login is successful") {
        const { firstName } = dataRes.data;

        dispatch(loginRedux(dataRes));

        toast("Welcome " + firstName);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      if (dataRes.message === "Email is not registered") {
        setTimeout(() => {
          navigate("/signup");
        }, 1000);
      }
      //alert("Success");
    } else {
      toast("Required fields cannot be empty");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        {/*<h1 className="text-center text-2xl ">Sign up</h1>*/}
        <div className="m-auto w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img
            //src={imageUrl ? imageUrl : loginSignupImage}
            src={loginSignupImage}
            className="w-full"
          />
        </div>

        <form
          className="w-full py-3 flex flex-col"
          type="submit"
          onSubmit={handleSubmit}
        >
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

          <button
            className="w-full max-w-[120px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-2">
          New here ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
