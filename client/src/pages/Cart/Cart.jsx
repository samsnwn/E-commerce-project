import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartProduct from "../../components/Products/CartProduct";

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);

  // When cart is loaded, check if user has products in the cart already

    // check in local storage if there is a cart for this user
    useEffect(()=> {
      const productsArray = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).cart).products
      if(productsArray.length > 0) {
        setProducts(productsArray)
      }
    }, [])

  return (
    <div className="">
      <div className="p-5">
        <h1 className="font-extralight text-center">Your BAG</h1>
        <div className="flex items-center justify-between p-5">
          <Link
            to="/products"
            className="p-3 font-semibold cursor-pointer border border-black-400"
          >
            CONTINUE SHOPPING
          </Link>
          <div className="underline cursor-pointer mx-2">Shopping Bag(2)</div>
          <Link to="/wishlist" className="underline cursor-pointer mx-2">
            Your Wishlist(0)
          </Link>
          <div className="">
            <button className="p-3 font-semibold cursor-pointer bg-black text-white">
              CHECKOUT NOW
            </button>
          </div>
        </div>

        <div className="flex justify-between p-10 flex-col lg:flex-row">
          {products.length <= 0 ? (
            <h1>Your cart is empty</h1>
          ) : (
            <CartProduct />
          )}
           <div className="bottom flex justify-between">
          <div className="summary flex-1 border border-thin rounded-xl p-4">
            <div className="summaryTitle font-semibold text-2xl">
              ORDER SUMMARY
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Subtotal</span>
              <span className="summaryItemPrice">{cart.total}€</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Estimated Shipping</span>
              <span className="summaryItemPrice">5.95€</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Shipping Discount</span>
              <span className="summaryItemPrice">-5.95€</span>
            </div>
            <div className="summaryItem font-bold text-xl">
              <span className="summaryItemText">Total</span>
              <span className="summaryItemPrice">{cart.total}€</span>
            </div>
            <button className="w-full p-2 bg-black text-white font-bold ">
              Checkout Now
            </button>
          </div>
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default Cart;
