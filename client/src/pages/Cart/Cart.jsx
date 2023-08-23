import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartProduct from "../../components/Products/CartProduct";
import baseUrl from "../../config/config";
// import { cartActions } from "../../redux/cartSlice";
import axios from "axios";
import PayButton from "../../components/PayButton";
import OrderSummary from "../../components/OrderSummary";
import CartItem from "../../components/Products/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  // const user = useSelector((state) => state.user.currentUser);
  const {wishlistItems} = useSelector((state) => state.wishlist);

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
            Your Wishlist({wishlistItems.length})
          </Link>
        </div>

        <div className="flex justify-center p-10 flex-col lg:flex-row">
          {cartItems.length <= 0 ? (
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
            <CartItem />
          )}
          <OrderSummary>
            <PayButton cart={cartItems} />
            <Link to="/shipping">Checkout Now</Link>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
};

export default Cart;
