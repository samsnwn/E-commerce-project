import { useState } from "react";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../assets/api/salesData";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      slideIndex > 0 ? setSlideIndex(slideIndex-1) : setSlideIndex(2)
    } else {
      slideIndex < 2 ? setSlideIndex(slideIndex+1) : setSlideIndex(0)
    }
  };

  return (
    <div className="w-full h-screen flex relative overflow-x-hidden">
      <div
        direction="left"
        className="w-[50px] h-[50px] bg-[#fff7f7] rounded-full flex items-center justify-center absolute top-0 bottom-0 m-auto left-[10px] cursor-pointer opacity-50 z-20 hover:opacity-40"
        onClick={() => handleClick("left")}
      >
        <ArrowLeftOutlinedIcon />
      </div>
      <div
        className={`h-full flex translate-x-[${slideIndex * -100}vw] transition-all ease duration-[1.5s]`}
      >
        {sliderItems.map((item, index) => (
          <div
            style={{ backgroundColor: item.bg }}
            key={item.id}
            className="slide flex items-center w-screen h-screen"
          >
            <div className="h-full flex items-center justify-end flex-auto">
              <img src={item.img} alt="" className="h-80" />
            </div>
            <div className="flex-auto p-12">
              <h1 className="text-7xl">{item.title}</h1>
              <p className="my-12 text-xl tracking-wide">{item.desc}</p>
              <button className="p-2 text-xl cursor-pointer">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
      <div
        direction="right"
        className="w-[50px] h-[50px] bg-[#fff7f7] rounded-full flex items-center justify-center absolute top-0 bottom-0 m-auto right-[10px] cursor-pointer hover:opacity-40"
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlinedIcon />
      </div>
    </div>
  );
};

export default Slider;
