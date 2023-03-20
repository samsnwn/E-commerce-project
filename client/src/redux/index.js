import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const isIncluded = state.cart.find(item => item.id === action.payload.id);
      if(isIncluded === undefined) {
        state.cart = [...state.cart, action.payload.item];
      }
      state.cart = state.cart
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen
    }
  },
});


export default cartSlice.reducer;
