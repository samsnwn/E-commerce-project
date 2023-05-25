import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import ContactForm from "./pages/Contact";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import SetNewPassword from "./pages/Auth/SetNewPassword";
import ShippingScreen from "./pages/Shipping/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./pages/Shipping/PaymentScreen";
import PlaceOrderScreen from "./pages/Shipping/PlaceOrderScreen";
import OrderPage from "./pages/OrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <AllProducts /> },
      { path: "contact", element: <ContactForm /> },
      { path: "products/:category", element: <ProductsList /> },
      { path: "product/:productId", element: <ProductPage /> },
      { path: "cart", element: <Cart /> },
      { path: "emailconfirmation", element: <ConfirmEmail /> },
      { path: "emailverification/:id", element: <VerifyEmail /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "user/resetpassword/:token", element: <SetNewPassword /> },
      { path: "events", element: <Events /> },
      { path: "events/:eventId", element: <EventPage /> },
      { path: "about", element: <AboutUs /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "profile", element: <Profile /> },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          { path: "/shipping", element: <ShippingScreen /> },
          { path: "/payment", element: <PaymentScreen /> },
          { path: "/placeorder", element: <PlaceOrderScreen /> },
          { path: "/order/:id", element: <OrderPage /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/checkout-success",
    element: <Confirmation />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
