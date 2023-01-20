import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../client/src/redux/apiCalls";
import { userActions } from "../../../client/src/redux/userSlice";
import { publicRequest } from "../../../client/src/requestMethods";
import { BASE_URL } from "../requestMethods";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const user = useSelector((state) => state.user.currentUser);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue.trim(),
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userActions.loginStart());
    try {
      const res = await publicRequest.post(`${BASE_URL}/auth/login`, userData);
      if (res) {
        dispatch(userActions.loginSuccess(res.data));
        navigate('/')
      }
    } catch (error) {
      dispatch(userActions.loginFailure());
      console.log(error)
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div>
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          onChange={onChangeHandler}
          style={{ padding: 10, marginBottom: 20 }}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          onChange={onChangeHandler}
          style={{ padding: 10, marginBottom: 20 }}
        />
      </div>
      <button type="submit" style={{ width: 150, padding: 10 }}>
        Login
      </button>
    </form>
  );
};

export default Login;
