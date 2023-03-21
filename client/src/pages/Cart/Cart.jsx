import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartProduct from "../../components/Products/CartProduct";
import baseUrl from "../../config/config";
import { cartActions } from "../../redux/cartSlice";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const wishlist = useSelector((state) => state.wishlist);

  const getUserCart = async () => {
    const headers = {
      "Authorization": `Bearer ${user.accessToken}`,
      "Content-Type": "application/json",
    };
    const userCart = await axios.get(
      `${baseUrl}/cart/user_cart/${user.data.user._id}`,
      { headers }
    );
    if (userCart & userCart.data.length > 0) {
      dispatch(cartActions.setProducts(userCart.data));
    }
  };

  useEffect(() => {
    getUserCart();
    console.log(cart.products)
  }, [cart.products.length]);

  return (
    <div className="min-h-[90vh]">
      <div className="p-5">
        <h1 className="font-extralight text-center">Your BAG</h1>
        <div className="flex items-center justify-between p-5">
          <Link
            to="/products"
            className="p-3 font-semibold cursor-pointer border border-black-400"
          >
            CONTINUE SHOPPING
          </Link>
          <Link to="/wishlist" className="underline cursor-pointer mx-2">
            Your Wishlist({wishlist.items.length})
          </Link>
        </div>

        <div className="flex justify-center p-10 flex-col lg:flex-row">
          {cart.products.length <= 0 ? (
            <div className="self-center">
              <h1>Your cart is empty</h1>
              <Link
                to="/products"
                className="p-3 font-semibold cursor-pointer border border-black-400"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <CartProduct />
          )}
          <div className="bottom flex justify-between">
            <div
              className={`summary flex-1 border border-thin rounded-xl p-4 ${
                cart.products.length <= 0 && "hidden"
              }`}
            >
              <div className="summaryTitle font-semibold text-2xl">
                ORDER SUMMARY
              </div>
              <div>
                {cart.products.map((product, idx) => (
                  <div key={product._id} className="summaryItem">
                    <span className="summaryItemText">1x {product.title}</span>
                    <span className="summaryItemPrice">{product.price}€</span>
                  </div>
                ))}
              </div>
              <div className="h-[5px] w-full border"></div>
              <div className="summaryItem  font-extrabold">
                <span className="summaryItemText">Subtotal</span>
                <span className="summaryItemPrice">{cart.total}€</span>
              </div>
              <button className="w-full p-2 bg-black text-white font-bold ">
                <Link to="/checkout">Checkout Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
