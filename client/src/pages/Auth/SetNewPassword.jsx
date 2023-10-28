import axios from "axios"; 
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../config/config";

const SetNewPassword = () => {
  const [userData, setUserData] = useState();
  const location = useLocation();
  const token = location.pathname.split("/")[3];

  const navigate = useNavigate();

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
      const res = await axios.patch(
        `${baseUrl}/auth/resetPassword/${token}`,
        userData
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[80vh] flex items-center flex-col m-20">
      <form className="flex flex-col mb-10 p-10" onSubmit={submitHandler}>
        <label htmlFor="email">Please enter your new password</label>
        <input
          type="password"
          name="password"
          className="border-2"
          onChange={onChangeHandler}
          required
        />
        <label htmlFor="email">Please confirm your new password</label>
        <input
          type="password"
          name="passwordConfirm"
          className="border-2"
          onChange={onChangeHandler}
          required
        />
        <button type="submit" className="">
          Change password
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
