import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/userApiSlice";
import { setCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/UI/Loader";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

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
      const res = await login(userData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="w-screen h-screen bgLogin flex flex-col items-center justify-center">
      <Link className="my-5" to="/">
        GO BACK TO SHOP
      </Link>
      <div className="p-5 w-[70%] lg:w-[40%] bg-white ">
        <h1 className="text-2xl font-light text-center">Welcome Back!</h1>
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
          <Input
            onChange={onChangeHandler}
            underlined
            label="Password"
            className="input"
            name="password"
            type="password"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-3 bg-teal-200 mt-5 disabled:bg-green-300 disabled:cursor-not-allowed`}
          >
            Login
          </button>

          {/* {user.error && (
            <span className="text-red-500">Something went wrong...</span>
          )} */}
          <Link to="/forgotpassword" className="loginLinks mt-6">
            DON'T REMEMBER THE PASSWORD?
          </Link>
          <Link
            className="loginLinks"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            CREATE A NEW ACCOUNT
          </Link>
        </form>
        {/* <Link to="/api/auth/google">GOOGLE</Link> */}
        <div className="flex my-5 w-[80%] mx-auto">
          <span className="h-[1px] w-full border border-neutral-950 my-[12px]"></span>
          <p className="mx-2">Or</p>
          <span className="h-[1px] w-full border border-neutral-950 my-[12px]"></span>
        </div>
        <div className="my-5 flex justify-center">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
