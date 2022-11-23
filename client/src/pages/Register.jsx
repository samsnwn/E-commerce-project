import React from "react";
import { Input } from "@nextui-org/react";

const Register = () => {
  return (
    <div
      className="w-screen h-screen bgImage flex items-center justify-center"
    >
      <div className="p-5 w-[40%] bg-white ">
        <h1 className="text-2xl font-light">CREATE AN ACCOUNT</h1>
        <form action="" className="flex flex-col mt-4">
          <Input bordered clearable underlined label="Name"  className="input"/>
          <Input
            type="email"
            bordered
            clearable
            underlined
            label="Email" className="input"
          />
          <Input.Password bordered underlined label="Password"  className="input"/>
          <Input.Password
            bordered
            underlined
            label="Confirm password" className="input"
          />
            <span className="text-sm my-6">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button className="w-[40%] py-2 px-3 bg-teal-200">CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
