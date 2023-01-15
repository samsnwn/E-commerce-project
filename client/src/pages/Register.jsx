import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import baseUrl from "../config/config";
import {  useNavigate } from "react-router-dom";



const Register = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate()

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

    try {
      const res = await axios.post(`${baseUrl}/auth/register`, userData);
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="w-screen h-screen bgImage flex items-center justify-center"
    >
      <div className="p-5 w-[40%] bg-white ">
        <h1 className="text-2xl font-light">CREATE AN ACCOUNT</h1>
        <form action="" className="flex flex-col mt-4">
          <Input clearable underlined label="Name"  className="input" onChange={onChangeHandler} name="name"/>
          <Input
            onChange={onChangeHandler} name="email"
            type="email"
            clearable
            underlined
            label="Email" className="input"
          />

          <Input.Password underlined label="Password"  className="input" onChange={onChangeHandler} name="password"/>
          {/* <Input.Password
            underlined
            label="Confirm password" className="input"
          /> */}
            <span className="text-sm my-6">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button className="w-[40%] py-2 px-3 bg-teal-200" onClick={submitHandler}>CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
