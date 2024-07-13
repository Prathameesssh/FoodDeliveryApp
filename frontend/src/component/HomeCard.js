import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ id, name, image, category, price, description }) => {
  return (
    <div className="bg-slate-300 shadow-md p-2 rounded">
      <Link to={`menu/${id}`} className="cursor-pointer">
        <div className="w-40 min-h-[150px]">
          <img src={image} alt={name} className="h-full w-full" />
        </div>
        <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
          {name}
        </h3>
        <p className="text-center text-slate-500 font-medium ">{category}</p>
        <p className="text-center font-bold">
          {" "}
          ₹ <span>{price}</span>
        </p>
      </Link>
    </div>
  );
};

export default HomeCard;
