import {useDispatch, useSelector } from 'react-redux'
import  {logoutUser}  from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import {useLogoutMutation} from "../redux/userApiSlice";
import {toast} from "react-toastify"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [logout, {isLoading}] = useLogoutMutation()

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await logout().unwrap()
      dispatch(logoutUser())
      navigate("/")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <div>
      <h1>Welcome Back </h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Profile