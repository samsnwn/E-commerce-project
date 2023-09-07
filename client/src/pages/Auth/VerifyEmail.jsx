import { useState } from "react";
import Button from "../../components/UI/Button";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import { useVerifyEmailMutation } from '../../redux/userApiSlice'
import axios from "axios";
import baseUrl from "../../config/config";
import { toast } from "react-toastify";


const VerifyEmail = () => {
  // const [verifyEmail, {isLoading}] = useVerifyEmailMutation()
  const navigate = useNavigate()
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [isUserVerified, setIsUserVerified] = useState(false);

  const submitHandler = async () => {
    try {
      // const res = await verifyEmail(userId).unwrap()
      const res = await axios.patch(
        `${baseUrl}/auth/emailVerification/${userId}`,
        userId
      );
      setIsUserVerified(true);
      navigate("/login")
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error)
      setIsUserVerified(false);
    }
  };

  return (
    <>
      {isUserVerified ? (
        <div>
          <p>{message}</p>
          <Link to="/login">Go to Login</Link>
        </div>
      ) : (
        <Button label="VerifyEmail" onClick={submitHandler}></Button>
      )}
    </>
  );
};

export default VerifyEmail;
