import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/config"
import Product from "./Product";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
          ? `${baseUrl}/products?category=${cat}`
          : `${baseUrl}/products`
          );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);
  console.log(products)

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter(item =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, products]);
  console.log(filteredProducts)

  useEffect(() => {
    if(sort === 'newest') {
      setFilteredProducts(prev=> [...prev].sort((a,b)=> a.createdAt - b.createdAt))
    } else if(sort === 'asc') {
      setFilteredProducts(prev=> [...prev].sort((a,b)=> a.price - b.price))
    } else {
      setFilteredProducts(prev=> [...prev].sort((a,b)=> b.price - a.price))
    }
  }, [sort])



  return (
    <div className="flex p-4 flex-wrap justify-between">
      {filteredProducts.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </div>
  );
};

export default Products;
