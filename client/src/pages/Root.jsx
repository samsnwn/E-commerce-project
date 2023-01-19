import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Nav from "../components/Navbar/Nav";
import Newsletter from "../components/Newsletter";

const RootLayout = () => {
  const navigation = useNavigation()
  return (
    <>
      <Announcement />
      <Nav />
      <main>
        {/* {navigation.state === "loading" && <h2>Loading...</h2>} */}
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
