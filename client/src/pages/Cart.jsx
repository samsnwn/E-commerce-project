import React from "react";
import Nav from "../components/Navbar/Nav";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import AddOutlined from "@mui/icons-material/AddOutlined";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";

const Cart = () => {
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
            <div className="product flex justify-between">
              <div className="productDetail flex flex-[2 2 0%]">
                <img className="w-[200px]"
                  src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" 
                  alt=""
                />
                <div className="details flex flex-col p-5 justify-around">
                  <span className="productName">
                    {" "}
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </span>
                  <span className="productId">
                    {" "}
                    <b>ID:</b> 93813718293
                  </span>
                  <div className="productColor w-[20px] h-[20px] rounded-full bg-black"> </div>
                  <div className="productSize">
                    {" "}
                    <b>Size:</b> 37.5
                  </div>
                </div>
              </div>

              <div className="priceDetail flex items-center justify-center flex-1 flex-col">
                <div className="amountContainer flex items-center mb-5">
                    <AddOutlined/>
                    <div className="productAmount text-2xl m-0.5">1</div>
                    <RemoveOutlined/>
                </div>
                <div className="productPrice text-3xl font-extralight">25€</div>
              </div>
              
            </div>
            <hr className="bg-[#f0f0f0] h-0.5"/>
            <div className="product flex justify-between">
              <div className="productDetail flex flex-[2 2 0%]">
                <img className="w-[200px]"
                  src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png"
                  alt=""
                />
                <div className="details flex flex-col p-5 justify-around">
                  <span className="productName">
                    {" "}
                    <b>Product:</b> HAKURA T-SHIRT
                  </span>
                  <span className="productId">
                    {" "}
                    <b>ID:</b> 93813718293
                  </span>
                  <div className="productColor w-[20px] h-[20px] rounded-full bg-gray-400"> </div>
                  <div className="productSize">
                    {" "}
                    <b>Size:</b> M
                  </div>
                </div>
              </div>

              <div className="priceDetail flex items-center justify-center flex-1 flex-col">
                <div className="amountContainer flex items-center mb-5">
                    <AddOutlined/>
                    <div className="productAmount text-2xl m-0.5">2</div>
                    <RemoveOutlined/>
                </div>
                <div className="productPrice text-3xl font-extralight">20€</div>
              </div>
              
            </div>
          </div>


          <div className="summary flex-1 border border-thin rounded-xl h-[50vh] p-4">
            <div className='summaryTitle font-semibold text-2xl'>ORDER SUMMARY</div>
            <div className="summaryItem">
                <span className='summaryItemText'>Subtotal</span>
                <span className="summaryItemPrice">80€</span>
            </div>
            <div className="summaryItem">
                <span className='summaryItemText'>Estimated Shipping</span>
                <span className="summaryItemPrice">80€</span>
            </div>
            <div className="summaryItem">
                <span className='summaryItemText'>Shipping Discount</span>
                <span className="summaryItemPrice">-8€</span>
            </div>
            <div className="summaryItem font-bold text-xl">
                <span className='summaryItemText'>Total</span>
                <span className="summaryItemPrice">72€</span>
            </div>
            <button className="w-full p-2 bg-black text-white font-bold ">Checkout Now</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
