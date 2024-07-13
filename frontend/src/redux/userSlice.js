import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  image: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.email = action.payload.data.email;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.image = action.payload.data.image;
      state._id = action.payload.data._id;
      console.log(state.email);
    },
    logoutRedux: (state, action) => {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.image = "";
      state._id = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
