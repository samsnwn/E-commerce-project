import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../client/src/redux/apiCalls";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState();
  const user = useSelector(state => state.user.currentUser)

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue.trim(),
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, userData)
  }
  console.log(user)

  return (
    <form onSubmit={submitHandler} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height:'100vh', flexDirection: 'column'}}>
      <div>
        <input
        placeholder='Email'
          type="email"
          name="email"
          id="email"
          onChange={onChangeHandler}
          style={{padding: 10, marginBottom: 20}}
        />
      </div>
      <div>
        <input
        placeholder='Password'
          type="password"
          name="password"
          id="password"
          onChange={onChangeHandler}
          style={{padding: 10, marginBottom: 20}}
        />
      </div>
      <button type="submit" style={{width:150, padding: 10}}>Login</button>
    </form>
  );
};

export default Login;
