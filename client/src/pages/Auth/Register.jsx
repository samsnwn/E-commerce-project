import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Button from "../../components/UI/Button";
import { useRegisterMutation } from "../../redux/userApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

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
    if (userData.password !== userData.passwordConfirm) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register(userData).unwrap();
        navigate("/emailconfirmation");
      } catch (error) {
        toast.error(error?.data.message);
      }
    }
  };

  return (
    <div className="w-screen h-screen bgImage flex flex-col items-center justify-center">
      <Link className="" to="/">
        GO BACK TO SHOP
      </Link>
      <div className="p-5 w-[40%] bg-white ">
        <h1 className="text-2xl font-light">CREATE AN ACCOUNT</h1>
        <form action="" className="flex flex-col mt-4" onSubmit={submitHandler}>
          <Input
            clearable
            underlined
            label="Name"
            className="input"
            onChange={onChangeHandler}
            name="name"
          />
          <Input
            onChange={onChangeHandler}
            name="email"
            type="email"
            clearable
            underlined
            label="Email"
            className="input"
          />
          <Input.Password
            underlined
            label="Password"
            className="input"
            onChange={onChangeHandler}
            name="password"
          />
          <Input.Password
            underlined
            label="Confirm password"
            className="input"
            onChange={onChangeHandler}
            name="passwordConfirm"
          />
          <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
          />
          <span className="text-sm my-6">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button className="w-[40%] py-2 px-3 bg-teal-200" type="submit" disabled={isLoading}>
            CREATE
          </button>
          <Link className="loginLinks mt-3" to="/login">
            LOGIN TO EXISTING ACCOUNT
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
