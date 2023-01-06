import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer";
import Nav from "../components/Navbar/Nav";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div >
      <Announcement />
      <Nav />
      <Slider />
      <Categories/>
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
