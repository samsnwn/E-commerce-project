import axios from "axios";
import { useState } from "react";
import baseUrl from "../../config/config";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const onChangeHandler = (e) => {
    setEmail(e.target.value.trim());
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/auth/forgotPassword`, {
        email,
      });
      if (res) {
        toast.success(res.data.message);
        setMessage("Check your inbox to proceed")
      }
      setEmail("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[80vh] flex items-center flex-col m-20">
      <form className="flex flex-col mb-10 p-10" onSubmit={submitHandler}>
        <label htmlFor="email">Please enter your email address</label>
        <input
          type="email"
          name="email"
          className="border-2"
          onChange={onChangeHandler}
          required
          value={email}
        />
        <button type="submit" className="">
          Send password reset
        </button>
      </form>
      {message && <h2>{message}</h2>}
    </div>
  );
};

export default ForgotPassword;
