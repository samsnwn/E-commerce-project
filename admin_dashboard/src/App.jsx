import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";

function App() {

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.user.isAdmin

  // useEffect(()=> {

  // }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={admin ? <Dashboard /> : <Navigate to='/login'/>} />
        <Route path='/login' element={admin ? <Navigate to='/' /> : <Login/>} />
      </Routes>
    </>
  );
}

export default App;
