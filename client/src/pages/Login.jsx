import React from 'react'
import { Input } from "@nextui-org/react";


const Login = () => {
  return (
    <div
      className="w-screen h-screen bgLogin flex items-center justify-center"
    >
      <div className="p-5 w-[40%] bg-white ">
        <h1 className="text-2xl font-light">Welcome Back!</h1>
        <form action="" className="flex flex-col mt-4">
          <Input
            type="email"
            clearable
            underlined
            label="Email" className="input"
          />
          <Input.Password  underlined label="Password"  className="input"/>
          <button className="w-[40%] py-2 px-3 bg-teal-200 mt-5">Login</button>
          <a className="loginLinks mt-6">DO NOT YOU REMEMBER THE PASSWORD?</a>
          <a className="loginLinks">CREATE A NEW ACCOUNT</a>
        </form>
      </div>
    </div>
  )
}

export default Login