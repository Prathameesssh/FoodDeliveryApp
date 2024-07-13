import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures";
import { toast } from "react-hot-toast";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const userData = useSelector((state) => state.user);

  if (!productData || productData.length === 0) {
    return <div>Loading...</div>;
  }

  const productDisplay = productData.find((el) => el._id === filterby);
  // Check if the product is found
  if (!productDisplay) {
    return <div>Product not found</div>;
  }
  const { _id, name, image, category, description, price } = productDisplay;
  const id = _id;
  const filter = productData.filter(
    (el) => el.category.toLowerCase() === category.toLowerCase()
  );
  console.log(productDisplay);

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
    <div className="p-2 md:p-4 ">
      <div className="w-1/2 max-w-4x1 bg-white m-auto md:flex min-h-[300px]">
        <div className="md:w-1/2  shadow overflow-hidden ">
          <img src={image} className=" hover:scale-105 transition-all" />
        </div>
        <div className="flex flex-col gap-1 ">
          <h3 className="font-semibold mx-3 mt-7 text-slate-600 capitalize text-2xl md:text-4xl">
            {name}
          </h3>
          <p className="text-slate-500 mx-3 font-medium text-2xl ">
            {category}
          </p>
          <p className="font-bold mx-3 md:text-3xl">
            {" "}
            ₹ <span>{price}</span>
          </p>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-yellow-500 py-2 px-3 my-2 ml-2 active:bg-yellow-700 rounded text-sm transition-transform transform hover:scale-110 min-w-[100px]"
            >
              Buy
            </button>
            <button
              type="submit"
              onClick={debouncedAddToCart}
              className="bg-yellow-500 py-2 px-3 my-2 active:bg-yellow-700 rounded text-sm transition-transform transform hover:scale-110 min-w-[100px]"
            >
              Add to Cart
            </button>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Description : </p>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center mx-10">
        <h2 className="font-bold text-2xl text-slate-800 mb-4 mx-4">
          Related Products :
        </h2>
      </div>
      <div className="flex gap-8 flex-wrap py-4 mx-10">
        {filter.map((el) => {
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
  );
};

export default Menu;
