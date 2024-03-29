import { useEffect } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Nav from "../components/Navbar/Nav";
import Newsletter from "../components/Newsletter";
import Loader from "../components/UI/Loader";

const RootLayout = () => {
  const navigation = useNavigation();
  const { pathname } = useLocation();

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <>
      <ScrollToTop />
      <header>
        <Announcement />
      </header>
      <Nav />
      <main>
        {navigation.state === "loading" && <Loader/>}
        <Outlet />
      </main>
      <footer>
        <Newsletter />
        <Footer /> 
      </footer>
    </>
  );
};

export default RootLayout;
