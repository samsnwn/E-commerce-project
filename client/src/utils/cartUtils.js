export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    Number(state.cartItems.reduce((acc, item) => acc + item.price, 0))
  );
  // Calculate shipping price (if order is over 100€ then free, else 10€)
  state.shippingPrice = addDecimals(Number(state.itemsPrice > 100 ? 0 : 10)); // 10 si es menor de 100
  // Calculate tax price (15%)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};


export const updateWishlist = (state) => {
  localStorage.setItem("wishlist", JSON.stringify(state))
  return state
}
