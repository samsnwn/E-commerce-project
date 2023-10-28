import AllProducts from "../../components/Products/AllProducts";
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
      <h1 className="m-7 text-4xl text-center">{cat[0].toUpperCase() + cat.slice(1)}</h1>
      <div className="flex justify-between ">
        <div className="m-5">
          <span className="text-sm font-bold mr-2">Filter by size:</span>
          <select name="size" id="" className="select" onChange={handleFilters}>
            <option disabled>
              Size
            </option>
            <option>All</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="m-5">
          <span className="text-sm font-bold mr-2">Sort Products:</span>
          <select className="sort bg-white border" onChange={(e)=> setSort(e.target.value)}>
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
