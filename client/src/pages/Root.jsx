import React from "react";
import { Outlet } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Nav from "../components/Navbar/Nav";
import Newsletter from "../components/Newsletter";

const RootLayout = () => {
  return (
    <>
      <Announcement />
      <Nav />
      <main>
        <Outlet />
      </main>
      <footer>
        <Newsletter/>
        {/* <Footer/> */}
      </footer>
    </>
  );
};

export default RootLayout;
