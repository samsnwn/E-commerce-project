import { useSelector } from 'react-redux'
import {toast} from "react-toastify"
import Button from "../components/UI/Button"
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../config/config';

const Profile = () => {
  const {userInfo} = useSelector(state => state.auth)
  const [userInput, setUserInput] = useState()

  const onChangeHandler = (e) => {
    const value = e.target.value.trim();
    setUserInput((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  }
  
  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.patch(`${baseUrl}/user/updateMe/${userInfo.data.id}`, userInput)
      toast.success(res.data.message)
    } catch (error) {
      toast.error("Error updating user")
    }
  }

  return (
    <div>
      <h1>Welcome Back {userInfo.data.name}</h1>
      <div>
      <form action="" className="flex flex-col mt-4 text-black" onSubmit={submitHandler}>
        <label htmlFor="name">Name:</label>
          <input
            label="name"
            className="input"
            onChange={onChangeHandler}
            name="name"
          />
        <label htmlFor="email">Email:</label>
          <input
            onChange={onChangeHandler}
            name="email"
            className="input"
            type="email"
            label="Email"
          />
        {/* <label htmlFor="oldPassword">Old Password:</label>
          <input
            onChange={onChangeHandler}
            name="oldPassword"
            className="input"
            type="password"
            label="oldPassword"
          />
        <label htmlFor="newPassword">New Password:</label>
          <input
            onChange={onChangeHandler}
            name="newPassword"
            type="password"
            className="input"
            label="newPassword"
          />
        <label htmlFor="newPasswordConfirm">Confirm New Password:</label>
          <input
            onChange={onChangeHandler}
            name="newPasswordConfirm"
            type="email"
            className="input"
            label="newPasswordConfirm"
          /> */}
          <button className="w-[40%] py-2 px-3 bg-teal-200" type="submit">
            Update
          </button>
        </form>
        <button className="w-[40%] py-2 px-3 bg-teal-200" type="button">
            Change password
          </button>
      </div>
    </div>
  )
}

export default Profile