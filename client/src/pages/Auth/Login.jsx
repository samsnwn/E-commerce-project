import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useLoginMutation} from "../../redux/userApiSlice";
import {setCredentials} from "../../redux/authSlice";
import {toast} from "react-toastify"
import Loader from "../../components/UI/Loader"
import Button from "../../components/UI/Button";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [login, {isLoading}] = useLoginMutation()
  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || "/"

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  },[redirect, userInfo, navigate])

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
      const res = await login(userData).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

  const googleHandler = async() => {
    try {
      const res = await axios.get("/api/auth/google")
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen h-screen bgLogin flex flex-col items-center justify-center">
      <Link className="" to="/">
        GO BACK TO SHOP
      </Link>
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
            disabled={isLoading}
            className={`w-[40%] py-2 px-3 bg-teal-200 mt-5 disabled:bg-green-300 disabled:cursor-not-allowed`}
          >
            Login
          </button>

          {/* {user.error && (
            <span className="text-red-500">Something went wrong...</span>
          )} */}
          <Link to="/forgot_password" className="loginLinks mt-6">
            DON'T REMEMBER THE PASSWORD?
          </Link>
          <Link className="loginLinks" to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            CREATE A NEW ACCOUNT
          </Link>
        </form>
          <Link to="api/auth/google">GOOGLE</Link>
      </div>
    </div>
  );
};

export default Login;
