import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories/Categories";
import Nav from "../components/Navbar/Nav";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Nav />
      <Slider />
      <Categories/>
      <Products/>
      <Newsletter/>
    </div>
  );
};

export default Home;
