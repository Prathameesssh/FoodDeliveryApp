import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const CardFeatures = ({ id, name, image, category, price, description }) => {
  const userData = useSelector((state) => state.user);

  const handleAddCartProduct = async (e) => {
    e.preventDefault();

    const email = userData.email;

    //send data to the backend
    if (email) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/AddToCart`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id, email }),
        }
      );
      const resData = await fetchData.json();
      toast(resData.message);
    } else {
      toast("Please Log in");
    }
  };

  const debouncedAddToCart = debounce(handleAddCartProduct, 300);

  return (
    <div className="flex justify-center items-center">
      <div className="w-48 ml-10 bg-white drop-shadow-lg hover:shadow-lg px-2  py-3 flex flex-col gap-2 cursor-pointer">
        <div className="flex flex-col justify-center items-center">
          <Link
            to={`/menu/${id}`}
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <img src={image} className="h-32 w-full object-cover" />
            <h3 className="font-semibold text-slate-600 text-center capitalize text-md whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-center text-slate-500 font-medium text-sm">
              {category}
            </p>
            <p className="text-center font-bold text-sm">
              ₹ <span>{price}</span>
            </p>
          </Link>
          <button
            type="submit"
            onClick={debouncedAddToCart}
            className="bg-yellow-500 py-1 px-2 my-2 active:bg-yellow-700 rounded text-sm transition-transform transform hover:scale-110"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFeatures;
