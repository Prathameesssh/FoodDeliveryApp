// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (email) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/cart?email=${email}`
    );
    const data = await response.json();
    return data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/cart/${itemId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete item from cart");
    }
    toast("Removed from Cart");
    return itemId; // Return the item ID
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Filter out the removed item by its ID
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
