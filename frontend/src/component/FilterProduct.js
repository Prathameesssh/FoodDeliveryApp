import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className=" flex text-3xl p-5 rounded-full bg-yellow-500  scrollbar-none overflow-scroll scroll-smooth transition-all">
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
