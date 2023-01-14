import React from "react";
import Nav from "../components/Navbar/Nav";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import AddOutlined from "@mui/icons-material/AddOutlined";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="">
      <Nav />
      <Announcement />
      <div className="p-5">
        <h1 className="font-extralight text-center">Your BAG</h1>
        <div className="flex items-center justify-between p-5">
          <button className="p-3 font-semibold cursor-pointer border border-black-400">
            CONTINUE SHOPPING
          </button>
          <div className="underline cursor-pointer mx-2">Shopping Bag(2)</div>
          <span className="underline cursor-pointer mx-2">
            Your Wishlist(0)
          </span>

          <div className="">
            <button className="p-3 font-semibold cursor-pointer bg-black text-white">
              CHECKOUT NOW
            </button>
          </div>
        </div>

        <div className="bottom flex justify-between">
          <div className="info flex-[3]">
            {cart.products.map((product, i) => (
              <div className="product flex justify-between" key={i}>
                <div className="productDetail flex flex-[2 2 0%]">
                  <img
                    className="w-[200px]"
                    src={product.image}
                    alt=""
                  />
                  <div className="details flex flex-col p-5 justify-around">
                    <span className="productName">
                      {" "}
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="productId">
                      {" "}
                      <b>ID:</b> {product._id}
                    </span>
                    <div className="productColor w-[20px] h-[20px] rounded-full bg-gray-400">
                      {product.color}
                      {" "}
                    </div>
                    <div className="productSize">
                      {" "}
                      <b>Size:</b> {product.size}
                    </div>
                  </div>
                </div>

                <div className="priceDetail flex items-center justify-center flex-1 flex-col">
                  <div className="amountContainer flex items-center mb-5">
                    <AddOutlined />
                    <div className="productAmount text-2xl m-0.5">{product.quantity}</div>
                    <RemoveOutlined />
                  </div>
                  <div className="productPrice text-3xl font-extralight">
                    {product.price*product.quantity}€
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="summary flex-1 border border-thin rounded-xl h-[50vh] p-4">
            <div className="summaryTitle font-semibold text-2xl">
              ORDER SUMMARY
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Subtotal</span>
              <span className="summaryItemPrice">{cart.total}€</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Estimated Shipping</span>
              <span className="summaryItemPrice">5.95€</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Shipping Discount</span>
              <span className="summaryItemPrice">-5.95€</span>
            </div>
            <div className="summaryItem font-bold text-xl">
              <span className="summaryItemText">Total</span>
              <span className="summaryItemPrice">{cart.total}€</span>
            </div>
            <button className="w-full p-2 bg-black text-white font-bold ">
              Checkout Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
