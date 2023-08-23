import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const CartItem = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="px-6 py-5 info flex-[3]">
      {cartItems.length > 0 &&
        cartItems.map((product, i) => (
          <div
            className="hover:bg-gray-100 flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-4 w-[80%]"
            key={i}
          >
            <Link to={`/product/${product._id}`}>
              <div className="flex items-center space-x-4">
                <img
                  className=" h-[200px] object-cover rounded-md w-[200px]"
                  src={product.image}
                  alt={product.title}
                />
                <div>
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className="text-gray-500 text-xl mt-1">${product.price}</p>
                </div>
              </div>
                </Link>
              <div >
                <button
                  className="font-semibold hover:text-red-500 text-gray-500 text-s"
                  onClick={() => handleRemoveFromCart(product._id)}
                >
                  Remove{" "}
                </button>
              </div>
          </div>
        ))}
    </div>
  );
};

export default CartItem;
