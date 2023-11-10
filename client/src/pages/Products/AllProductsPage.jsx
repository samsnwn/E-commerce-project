import ProductComponent from "../../components/Products/ProductComponent";
import { useGetProductsQuery } from "../../redux/productsApiSlice";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";
import { useEffect, useState } from "react";
import axios from "axios";
import { categories } from "../../assets/api/salesData";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const { data, isLoading, error } = useGetProductsQuery();
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category !== "All"
          ? `/api/products?category=${category}`
          : `/api/products`
          );
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    if (sort === "newest") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <div className="flex justify-between ">
        <div className="m-5">
          <span className="text-sm font-bold mr-2">Filter by category:</span>
          <select name="cat" id="" className="select" onChange={(e) => setCategory(e.target.value)}>
            <option disabled>Category</option>
            <option default>All</option>
            {categories.map((category, index) => (
              <option value={category.cat} key={index}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="m-5">
          <span className="text-sm font-bold mr-2">Sort Products:</span>
          <select
            className="sort bg-white border"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest" defaultValue>
              Newest
            </option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex p-4 flex-wrap justify-between">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="flex p-4 flex-wrap justify-between mx-auto">
              {products.length >=1 ? products.map((product, index) => (
                <ProductComponent key={index} product={product} />
              )) : <div className="w-full text-center"><h2 className="text-center">No items for this category yet. Please stay tuned!</h2></div>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
