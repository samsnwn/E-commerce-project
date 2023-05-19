import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// const cartInitialState = {
//   products: [],
//   quantity: 0,
//   total: 0,
//   status: null,
//   userProducts: {
//     products: [],
//     cartId: null,
//   },
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: cartInitialState,
//   reducers: {
//     setProducts: (state, action) => {
//       state.products = [...state.products, action.payload];
//       state.id = action.payload._id;
//     },
//     addToCart(state, action) {
//       const isIncluded = state.products.some(
//         (product) => product._id === action.payload._id
//       );
//       if (!isIncluded) {
//         state.products = [...state.products, action.payload];
//         state.quantity++;
//         state.total += action.payload.price;
//       } else {
//         state.products = state.products;
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.products = state.products.filter(
//         (item) => item._id !== action.payload._id
//       );
//       state.quantity--;
//       state.total = state.total - action.payload.price;
//     },
//     clearCart: (state) => {
//       state.products = [];
//       state.quantity = 0;
//       state.total = 0;
//     },
//   },
// });

// export const cartActions = cartSlice.actions;
// export default cartSlice.reducer;

const cartInitialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
  },
  removeFromCart: (state, action) => {
    state.products = state.products.filter(
      (item) => item._id !== action.payload._id
    );
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
