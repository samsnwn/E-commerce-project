import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Nav from "../components/Navbar/Nav";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products/Products";

const ProductList = () => {
  return (
    <div className="">
      <Announcement />
      <Nav />
      <h1 className="m-5">Dresses</h1>
      <div className="flex justify-between ">
        <div className="m-5">
          <span className="text-sm font-bold mr-2">Filter Products:</span>
          <select name="" id="" className="select">
            <option disabled selected>
              Color
            </option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>
          <select name="" id="" className="select">
          <option disabled selected>
              Size
            </option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="m-5">
          <span className="text-sm font-bold mr-2">Sort Products:</span>
          <select className="select">
            <option selected>Newest</option>
            <option>Price (asc)</option>
            <option>Price (desc)</option>
          </select>
        </div>
      </div>
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
