import React from "react";
import Announcement from "../components/Announcement";
import Nav from "../components/Navbar/Nav";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Nav />
      <Slider />
    </div>
  );
};

export default Home;
