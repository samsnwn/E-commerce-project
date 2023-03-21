import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation
} from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import ProductPage from "./pages/Products/ProductPage";
import ProductsList from "./pages/Products/ProductsList";
import Register from "./pages/Auth/Register";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import AllProducts from "./components/Products/AllProducts";
import Events from "./pages/Events/Events";
import EventPage from "./pages/Events/EventPage";
import AboutUs from "./pages/AboutUs";
import ConfirmEmail from "./pages/Auth/ConfirmEmail";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Profile from "./pages/Profile";
import Checkout from "./pages/checkout/Checkout";
import Confirmation from "./pages/checkout/Confirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <Home />, },
      { path: "products", element: <AllProducts /> },
      { path: "products/:category", element: <ProductsList /> },
      { path: "product/:productId", element: <ProductPage /> },
      { path: "cart", element: <Cart /> },
      // { path: "login", element: <Login /> },
      // { path: "register", element: <Register /> },
      { path: "email_confirmation/:token", element: <ConfirmEmail /> },
      { path: "forgot_password", element: <ForgotPassword /> },
      { path: "events", element: <Events /> },
      { path: "events/:eventId", element: <EventPage /> },
      { path: "about", element: <AboutUs /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "profile", element: <Profile /> },
      { path: "checkout", element: <Checkout /> },
      { path: "checkout/success", element: <Confirmation /> },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

const App = () => {


  
  const user = useSelector(state => state.user.currentUser)

  // When page is loaded, first check if user is logged in(send req to backend to check login status)
  // useEffect(()=> {
    
  // },[])

  return (
    <RouterProvider router={router} />
  );
};

export default App;
