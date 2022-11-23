import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Nav from "../components/Navbar/Nav";
import Newsletter from "../components/Newsletter";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Product = () => {
  return (
    <>
      <Announcement />
      <Nav />
      <div className="p-5 flex">
        <div className="flex-1 ">
          <img
            src="https://i.ibb.co/S6qMxwr/jean.jpg"
            alt=""
            className="w-full h-[90vh] object-cover"
          />
        </div>
        <div className="flex-1 px-5">
          <h1 className="font-extralight">Denim Jumpsuit</h1>
          <p className="my-4">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </p>
          <span className="font-thin text-4xl">20€</span>

        {/* Filter Container */}
          <div className="flex justify-between w-[50%] my-3">
            <div className="flex items-center ">
              <span className="text-xl font-extralight">Color</span>
              <div className='filterColor bg-[black]'></div>
              <div className='filterColor bg-[darkblue]'></div>
              <div className='filterColor bg-[gray]'></div>
            </div>
            <div className="">
              <span className="text-xl font-extralight">Size</span>
              <select name="" id="" className='ml-1 p-2'>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
          </div>

          {/* Add Container */}
          <div className='flex items-center w-1/2 justify-between'>
            <div className='flex items-center font-bold'>
              <button><RemoveOutlinedIcon/></button>
              <span className='w-[50px] h-[50px] rounded-xl border border-teal-200 flex items-center justify-center text-lg mx-1'>1</span>
              <button><AddOutlinedIcon/></button>
            </div>
            <button  className='p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]'>Add to cart</button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Product;
