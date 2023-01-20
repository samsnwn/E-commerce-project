import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {

  // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.isAdmin
  // const localUser = JSON.parse(localStorage.getItem("persist:root"))?.user
  // const currentUser = localUser && JSON.parse(localUser).currentUser;
  // const admin = currentUser?.isAdmin
  // const dispatch = useDispatch()
  // const user = useSelector(state => state.user)
  
  // useEffect(()=> {

  //   dispatch()
  // }, [])
  // console.log(admin)

  return (
    <>
      <Routes>
        {/* <Route path="/" element={admin ? <Dashboard /> : <Navigate to='/login'/>} />
        <Route path='/login' element={admin ? <Navigate to='/' /> : <Login/>} /> */}
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </>
  );
}

export default App;
