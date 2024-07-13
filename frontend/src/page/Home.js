import React, { useEffect, useState } from "react";
import Bike_Icon from "../assest/Bike_Icon.png";
import HomeCard from "../component/HomeCard.js";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures.js";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useRef } from "react";
import AllProduct from "../component/AllProduct.js";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);
  const homeProductCartList = productData.slice(1, 5);

  const homeProductCartListVegetable = productData.filter(
    (el) => el.category === "Vegetable",
    []
  );

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 bg-slate-200 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img src={Bike_Icon} className="h-7" />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery in
            <span className="text-red-500"> Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            dolor vel ante laoreet varius. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. In eget nulla
            lacinia, egestas dui sit amet, imperdiet nibh. Donec fermentum
            sapien rutrum, commodo magna id, bibendum felis. Maecenas vitae nunc
            nisi. Vivamus vitae laoreet lacus. Fusce pretium gravida viverra.
            Praesent quis fermentum magna. Quisque scelerisque pretium nibh, at
            pellentesque magna iaculis ut
          </p>
          <button
            className="font-bold bg-red-500 text-slate-200 px-4 py-1 rounded transition-transform transform hover:scale-110"
            type="submit"
          >
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap  gap-5 p-4 justify-center">
          {homeProductCartList[0] &&
            homeProductCartList.map((el) => {
              return (
                <HomeCard
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

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4 ">
            <button>
              <GrPrevious
                onClick={preveProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              />
            </button>
            <button>
              <GrNext
                onClick={nextProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetable.map((el) => {
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

      <AllProduct />
    </div>
  );
};

export default Home;
