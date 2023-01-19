import React from "react";
import {useSelector} from "react-redux";
import Categories from "../components/Categories/Categories";
import NextEvents from "../components/NextEvents";
import AllProducts from "../components/Products/AllProducts";
import Slider from "../components/Slider";

const Home = () => {

  const user = useSelector((state) => state.user.currentUser)


  console.log(user)

  return (
    <div >
      <Slider />
      <Categories/>
      <AllProducts/>
      <NextEvents/>
    </div>
  );
};

export default Home;
