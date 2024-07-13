import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header.js";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
      const resData = await res.json();
      console.log(resData);
      dispatch(setDataProduct(resData));
    })();
  }, []);
  console.log(productData);

  const abc = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("hello");
      resolve("Promise resolved"); // Resolve the promise with a message
    }, 1000);
  });
  abc.then((message) => {
    console.log(message); // Log the resolved message
  });

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
