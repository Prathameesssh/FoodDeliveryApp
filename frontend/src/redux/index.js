import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice.js";
import productSliceReducer from "./productSlice.js";
import cartSliceReducer from "./cartSlice.js";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer,
    cart: cartSliceReducer,
  },
});
