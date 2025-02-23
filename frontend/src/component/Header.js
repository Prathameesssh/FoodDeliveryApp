import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice.js";
import { toast } from "react-hot-toast";
import { clearCart } from "../redux/cartSlice.js";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    dispatch(clearCart());

    toast("Logged out successfully");
  };

  console.log(process.env.REACT_APP_SERVER_ADMIN_EMAIL);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 bg-white z-10">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={"/"}>
          <div className="h-12 ">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className=" gap-4 md:gap-6 z-1 text-base md:text-lg hidden md:flex">
            <Link
              to={""}
              onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
            >
              Home
            </Link>
            <Link className="cursor-pointer" to={"menu"}>
              Menu
            </Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                0
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-md ">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 pl-2 pr-6  drop-shadow-md flex flex-col items-start">
                {userData.email ===
                  process.env.REACT_APP_SERVER_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New product
                  </Link>
                )}
                <Link to={""} className="md:hidden">
                  Home
                </Link>
                <Link
                  to={"menu/666eb10d1424dfc9d94b6d6d"}
                  className="md:hidden"
                >
                  Menu
                </Link>
                <Link to={"about"} className="md:hidden">
                  About
                </Link>
                <Link to={"contact"} className="md:hidden">
                  Contact
                </Link>
                {userData.email ? (
                  <p className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile  */}
    </header>
  );
};

export default Header;
