import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);
  console.log(cartItems);

  useEffect(() => {
    if (userData.email) {
      dispatch(fetchCartItems(userData.email));
    }
  }, [dispatch, userData.email]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  if (!userData.email) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className=" text-2xl font-bold mt-36">User not logged in</h2>
        <span className="flex gap-1">
          Click here to
          <Link to={"/login"} className="underline text-red-600">
            login
          </Link>
        </span>
      </div>
    );
  }

  if (!cartItems) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className=" text-2xl font-bold mt-36">No products Added</h2>
        <span className="flex gap-1">
          Click here to
          <Link to={"/home"} className="underline text-red-600">
            browse
          </Link>
        </span>
      </div>
    );
  }

  if (cartStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (cartStatus === "failed") {
    return <div>Error: {cartError}</div>;
  }

  const handleBuyNow = (itemId) => {
    console.log("Buy item with ID:", itemId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-lg shadow-lg flex flex-col"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-40 w-full object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">{item.product.category}</p>
            <p className="text-lg font-bold">₹{item.product.price}</p>
            <p className="text-gray-600 mb-4">{item.product.description}</p>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleBuyNow(item._id)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Buy
              </button>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
