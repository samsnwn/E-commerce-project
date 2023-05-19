import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories/Categories";
import NextEvents from "../components/NextEvents";
import AllProducts from "../components/Products/AllProducts";
import MainCarousel from "../components/MainCarousel";
import { cartActions } from "../redux/cartSlice";
import axios from "axios";
import baseUrl from "../config/config";
import ShoppingList from "../components/ShoppingList";

const Home = () => {
  // const user = useSelector((state) => state.user.currentUser);
  // const cart = useSelector((state) => state.cart.products);
  // const userCart = useSelector((state) => state.cart.userProducts);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const getUserCart = async () => {
  //     if (user) {
  //     const headers = {
  //       Authorization: `Bearer ${user.accessToken}`,
  //       "Content-Type": "application/json",
  //     };
  //       const userCart = await axios.get(
  //         `${baseUrl}/cart/user_cart/${user.data.user._id}`,
  //         { headers }
  //       );
  //       if (userCart.data) {
  //         // dispatch(cartActions.setUserProducts(userCart.data.products));
  //       }
  //     }
  //     return null
  //   };
  //   getUserCart();
  // }, []);


  return (
    <div>
      <MainCarousel />
      <h1 className="text-center mt-10">All Categories</h1>
      <Categories />
      {/* <ShoppingList/> */}
      <AllProducts/>
      <NextEvents />
    </div>
  );
};

export default Home;
