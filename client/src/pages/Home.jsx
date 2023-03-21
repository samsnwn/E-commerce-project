import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Categories from "../components/Categories/Categories";
import NextEvents from "../components/NextEvents";
import AllProducts from "../components/Products/AllProducts";
import Slider from "../components/Slider";
import MainCarousel from "../components/MainCarousel";
import { cartActions } from "../redux/cartSlice";
import axios from "axios";
import baseUrl from "../config/config";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);

  const getUserCart = async () => {
    const headers = {
      "Authorization": `Bearer ${user.accessToken}`,
      "Content-Type": "application/json",
    };
    const userCart = await axios.get(
      `${baseUrl}/cart/user_cart/${user.data.user._id}`,
      { headers }
    );
    if (userCart.data.length > 0) {
      dispatch(cartActions.setProducts(userCart.data));
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);


  return (
    <div>
      <MainCarousel />
      <h1 className="text-center mt-10">All Categories</h1>
      <Categories />
      <AllProducts />
      <NextEvents />
    </div>
  );
};

export default Home;
