import React, { useState, useEffect } from "react";
import FilterProduct from "./FilterProduct.js";
import CardFeatures from "./CardFeatures.js";
import { useSelector } from "react-redux";

const AllProduct = () => {
  const productData = useSelector((state) => state.product.productList);

  //Filter data display
  const categoryList = [...new Set(productData.map((el) => el.category))];
  const [filterBy, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);
  //Add A button of clear filter and use a binary datatype in array which on change will affect the useeffect

  const handleFilterProduct = (category) => {
    if (category) {
      const filter = productData.filter(
        (el) => el.category.toLowerCase() === category.toLowerCase()
      );
      setDataFilter([...filter]);
      setFilterBy(category);
    } else {
      setDataFilter(productData);
      setFilterBy("");
    }
  };
  return (
    <div>
      <div className="my-5">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4 mx-4">
            All Products :
          </h2>
        </div>

        <div className="flex gap-4 justify-center items-center">
          {categoryList[0] &&
            categoryList.map((el) => {
              return (
                <FilterProduct
                  category={el}
                  onClick={() => handleFilterProduct(el)}
                />
              );
            })}
          <button
            className="bg-yellow-500 h-10 w-24 rounded"
            onClick={() => handleFilterProduct("")}
          >
            Reset
          </button>
        </div>

        <div className="flex gap-8 flex-wrap py-10 mx-10">
          {dataFilter.map((el) => {
            return (
              <CardFeatures
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                description={el.description}
                category={el.category}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
