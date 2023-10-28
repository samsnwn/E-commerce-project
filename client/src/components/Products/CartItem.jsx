import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="hover:bg-gray-100 flex justify-between items-center p-2 border border-gray-200 rounded-lg mb-4">
      <Link to={`/product/${item._id}`}>
        <div className="flex items-center space-x-4">
          <img
            className=" max-h-[200px] object-cover rounded-md max-w-[200px]"
            src={item.image[0]}
            alt={item.title}
          />
          <div>
            <h3 className="md:text-lg font-medium">{item.title}</h3>
            <p className="text-gray-800 text-md mt-1">{item.brand}</p>
            <p className=" text-xl mt-1">{item.price}€</p>
            <p className="text-gray-500 text-lg mt-1">Size {item.size}</p>
          </div>
        </div>
      </Link>
      <div>
        <button
          className="font-semibold hover:text-red-500 text-gray-500 text-sm"
          onClick={() => handleRemoveFromCart(item._id)}
        >
          Remove{" "}
        </button>
      </div>
    </div>
  );
};

export default CartItem;


  /* {cartItems.length > 0 &&
        cartItems.map((product, i) => (
          <div
            className="hover:bg-gray-100 flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-4 w-[80%]"
            key={i}
          >
            <Link to={`/product/${item._id}`}>
              <div className="flex items-center space-x-4">
                <img
                  className=" h-[200px] object-cover rounded-md w-[200px]"
                  src={item.image}
                  alt={item.title}
                />
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-500 text-xl mt-1">${item.price}</p>
                </div>
              </div>
                </Link>
              <div >
                <button
                  className="font-semibold hover:text-red-500 text-gray-500 text-s"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove{" "}
                </button>
              </div>
          </div>
        ))} */

