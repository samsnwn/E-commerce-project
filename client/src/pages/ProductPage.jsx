import React, { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect } from "react";
import baseUrl from "../config/config";
import axios from "axios";
import {cartActions} from '../redux/cartSlice'
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch()

  // const params = useParams()



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

  const handleQuantity = (method) => {
    if(method === 'decrease') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1);
    }
  }

  const handleAddToCart = () => {
    dispatch(cartActions.addProduct({...product, quantity, color, size}))
  }
  console.log(product)

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
              <span className="text-xl font-extralight">Color</span>
              {product.color?.map((color, index) => (
                <div
                  key={index}
                  className={`filterColor`}
                  style={{ backgroundColor: color }}
                  onClick={() => setColor(color)}
                ></div>
              ))}
            </div>
            <div className="filter">
              <span className="text-xl font-extralight">Size</span>
              <select name="" id="" className="ml-1 p-2" onChange={(e)=> setSize(e.target.value)} required>
                <option value="size" defaultValue disabled></option>
                {product.size?.map((size, index) => (
                  <option key={index}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Container */}
          <div className="flex items-center w-1/2 justify-between">
            <div className="flex items-center font-bold">
              <button onClick={()=>handleQuantity('decrease')}>
                <RemoveOutlinedIcon />
              </button>
              <span className="w-[50px] h-[50px] rounded-xl border border-teal-200 flex items-center justify-center text-lg mx-1">
                {quantity}
              </span>
              <button onClick={()=>handleQuantity('increase')}>
                <AddOutlinedIcon />
              </button>
            </div>
            <button className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]" onClick={handleAddToCart}>
              Add to cart
            </button>
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
