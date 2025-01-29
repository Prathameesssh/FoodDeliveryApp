import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from "../utility/ImageToBase64.js";
import { toast } from "react-hot-toast";

const NewProduct = () => {
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    try {
      const data = await ImageToBase64(file);
      setData((preve) => {
        return {
          ...preve,
          image: data,
        };
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const userData = useSelector((state) => state.user);

  const handleOnchange = (e) => {
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
    const { name, category, image, price, description } = data;
    const email = userData.email;
    try {
      if (email) {
        if (name && category && image && price && description) {
          //toast("Data uploaded Successfully");
          const fetchData = await fetch(
            `${process.env.REACT_APP_SERVER_DOMAIN}/api/products/add`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ ...data, email }),
            }
          );
          const dataRes = await fetchData.json();
          console.log("DataRes:", dataRes);
          toast(dataRes.message);
          setData({
            name: "",
            category: "",
            image: "",
            price: "",
            description: "",
          });
        } else {
          toast("Any field should not be empty");
        }
      } else {
        toast("User not signed in");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name"> Name</label>
        <input
          type={"text"}
          name="name"
          value={data.name}
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnchange}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          value={data.category}
          onChange={handleOnchange}
        >
          <option value={"No-Category"}>Select category</option>
          <option value={"Fruits"}> Fruits</option>
          <option value={"Vegetable"}>Vegetable</option>
          <option value={"Ice-cream"}>Ice-Cream</option>
          <option value={"Dosa"}>Dosa</option>
          <option value={"Pizza"}>Pizza</option>
          <option value={"Burger"}>Burger</option>
          <option value={"Rice"}>Rice</option>
          <option value={"Cake"}>Cake</option>
          <option value={"Chicken"}>Chicken</option>
          <option value={"Paneer"}>Paneer</option>
          <option value={"Other"}>Other</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full " />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}
            <input
              type={"file"}
              accept="image/*"
              onChange={uploadImage}
              id="image"
              name="image"
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          max="10000"
          className="bg-slate-200 p-1 my-1"
          name="price"
          value={data.price}
          onChange={handleOnchange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          name="description"
          className="bg-slate-200 p-1 my-1"
          value={data.description}
          onChange={handleOnchange}
        ></textarea>

        <button className="bg-slate-500 hover:bg-slate-700" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
