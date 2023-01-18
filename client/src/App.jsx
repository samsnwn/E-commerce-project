import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import ProductsList from "./pages/ProductsList";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import AllProducts from "./components/Products/AllProducts";
import Events from "./pages/Events/Events";
import EventPage from "./pages/Events/EventPage";
import AboutUs from "./pages/AboutUs";

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<Home/>}/>
//   </Route>
// )

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
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "events", element: <Events /> },
      { path: "events/:eventId", element: <EventPage /> },
      { path: "about", element: <AboutUs /> },
    ],
  }
]);

const App = () => {
  // const user = useSelector(state => state.user.currentUser)

  // useEffect(()=> {

  // },[])

  return (
    <RouterProvider router={router} />
    // <>
    //   {" "}
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/products/:category" element={<ProductList />} />
    //     <Route path="/product/:productId" element={<Product />} />
    //     <Route path="/cart" element={<Cart />} />
    //     <Route path='/login' element={user ? <Navigate to='/' /> : <Login/>} />
    //     <Route path='/register' element={user ? <Navigate to='/' /> : <Register/>} />
    //   </Routes>
    // </>
  );
};

export default App;
