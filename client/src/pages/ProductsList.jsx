import React from "react";
import AllProducts from "../components/Products/AllProducts";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');


  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <div className="">
      <h1 className="m-5">{cat}</h1>
      <div className="flex justify-between ">
        <div className="m-5">
          <span className="text-sm font-bold mr-2">Filter Products:</span>
          <select
            name="color"
            id=""
            className="select"
            onChange={handleFilters}
          >
            <option disabled defaultValue>
              Color
            </option>
            <option value="white">white</option>
            <option value="black">black</option>
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
          </select>
          <select name="size" id="" className="select" onChange={handleFilters}>
            <option disabled defaultValue>
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
          <select className="sort" onChange={(e)=> setSort(e.target.value)}>
            <option  value="newest" defaultValue>Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <AllProducts cat={cat} filters={filters} sort={sort}/>
    </div>
  );
};

export default ProductList;
