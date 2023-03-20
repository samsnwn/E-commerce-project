import React from "react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../../config/config";
import { userActions } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/cartSlice";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const user = useSelector((state) => state.user);

  const onChangeHandler = (e) => {
    const value = e.target.value.trim();
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userActions.loginStart())
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, userData)
      if(res) {
        dispatch(userActions.loginSuccess(res.data))
        dispatch(cartActions.clearCart())
        navigate('/')
      }
    } catch (error) {
      dispatch(userActions.loginFailure())
      console.log(error)
    }
  }


  return (
    <div className="w-screen h-screen bgLogin flex items-center justify-center">
      <div className="p-5 w-[40%] bg-white ">
        <h1 className="text-2xl font-light">Welcome Back!</h1>
        <form action="" className="flex flex-col mt-4" onSubmit={submitHandler}>
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
            type="submit"
            disabled={user.isFetching}
            className={`w-[40%] py-2 px-3 bg-teal-200 mt-5 disabled:bg-green-300 disabled:cursor-not-allowed`}
          >
            Login
          </button>
          {user.error && (
            <span className="text-red-500">Something went wrong...</span>
          )}
          <Link to='/forgot_password' className="loginLinks mt-6">DON'T REMEMBER THE PASSWORD?</Link>
          <Link className="loginLinks" to="/register">
            CREATE A NEW ACCOUNT
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
