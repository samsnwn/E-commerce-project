import React, { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect } from "react";
import baseUrl from "../../config/config";
import axios from "axios";
import {cartActions} from '../../redux/cartSlice'
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch()
  const [product, setProduct] = useState({});
  const cart = useSelector((state) => state.cart);
  const [isIncluded, setIsIncluded] = useState(cart.products.some((product) => product._id === id))

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);


  const handleAddToCart = () => {
    setIsIncluded(true)
    dispatch(cartActions.addToCart(product))
  }
  const handleRemoveFromCart = () => {
    setIsIncluded(false)
    dispatch(cartActions.removeFromCart(product));
  }

  return (
    <>
      <div className="p-5 flex">
        <div className="flex-1 ">
          <img
            src={product.image}
            alt=""
            className="w-full h-[90vh] object-cover"
          />
        </div>
        <div className="flex-1 px-5">
          <h1 className="font-extralight">{product.title}</h1>
          <p className="my-4"> {product.desc}</p>
          <span className="font-thin text-4xl">{product.price}€</span>

          {/* Filter Container */}
          <div className="flex justify-between w-[50%] my-3">
            <div className="flex items-center ">
              <span className="text-xl font-extralight">Color {product.color}</span>
            </div>
            <div className="filter">
              <span className="text-xl font-extralight">Size {product.size}</span>

            </div>
          </div>

          {/* Add Container */}
          <div className="flex items-center w-1/2 justify-between">
            {isIncluded ? (
            <button className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]" onClick={handleRemoveFromCart}>
            Remove from cart
          </button>
            ) : (
              <button className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]" onClick={handleAddToCart}>
              Add to cart
            </button>
            )}
          </div>
          {/* <div>
            <Link to={`/products/${product.categories.filter(cat => cat === )}`} relative="path" className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]">See more of this category</Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
