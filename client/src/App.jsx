import { useState } from "react";
import {useSelector} from "react-redux"
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";

const App = () => {
  const user = useSelector(state => state.user.currentUser)
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Home/> : <Login/>} />
        <Route path="/register" element={<Register />} />
        {user && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </>
  );
};

export default App;
