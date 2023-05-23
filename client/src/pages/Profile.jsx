import {useDispatch, useSelector } from 'react-redux'
import  {logoutUser}  from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import {useLogoutMutation} from "../redux/userApiSlice";
import {toast} from "react-toastify"
import Button from "../components/UI/Button"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [logout, {isLoading}] = useLogoutMutation()

  const {userInfo} = useSelector(state => state.auth)

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await logout().unwrap()
      dispatch(logoutUser())
      navigate("/login")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <div>
      <h1>Welcome Back {userInfo.data.name}</h1>
      <Button onClick={logoutHandler} label="LOGOUT" className="w-[50vw]">Logout</Button>
    </div>
  )
}

export default Profile