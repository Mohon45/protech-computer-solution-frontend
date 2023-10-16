import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setCartItem } = cartSlice.actions;

export default cartSlice.reducer;
