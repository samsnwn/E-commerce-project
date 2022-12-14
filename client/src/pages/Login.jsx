import React from "react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../config/config";
import { userActions } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");
  const {isFetching, error} = useSelector(state=> state.user)

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userActions.loginStart());
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, userData);
      dispatch(userActions.loginSuccess(res.data));
    } catch (err) {
      dispatch(userActions.loginFailure());
    }
  };

  return (
    <div className="w-screen h-screen bgLogin flex items-center justify-center">
      <div className="p-5 w-[40%] bg-white ">
        <h1 className="text-2xl font-light">Welcome Back!</h1>
        <form action="" className="flex flex-col mt-4">
          <Input
            onChange={onChangeHandler}
            type="email"
            clearable
            underlined
            label="Email"
            className="input"
            name="email"
          />
          <Input.Password
            onChange={onChangeHandler}
            underlined
            label="Password"
            className="input"
            name="password"
          />
          <button
            disabled={isFetching}
            onClick={submitHandler}
            className={`w-[40%] py-2 px-3 bg-teal-200 mt-5 disabled:bg-green-300 disabled:cursor-not-allowed`}
          >
            Login
          </button>
          {error &&  <span className="text-red-500">Something went wrong...</span>}
          <a className="loginLinks mt-6">DO NOT YOU REMEMBER THE PASSWORD?</a>
          <a className="loginLinks">CREATE A NEW ACCOUNT</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
