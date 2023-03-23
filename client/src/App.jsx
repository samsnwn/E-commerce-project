import {
  createBrowserRouter,
  RouterProvider
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
import Payment from "./pages/checkout/Payment";

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
      { path: "email_confirmation/:token", element: <ConfirmEmail /> },
      { path: "forgot_password", element: <ForgotPassword /> },
      { path: "events", element: <Events /> },
      { path: "events/:eventId", element: <EventPage /> },
      { path: "about", element: <AboutUs /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/checkout-success",
    element: <Confirmation />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
