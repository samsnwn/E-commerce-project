import React from "react";
import Categories from "../components/Categories/Categories";
import NextEvents from "../components/NextEvents";
import AllProducts from "../components/Products/AllProducts";
import Slider from "../components/Slider";

const Home = () => {
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
