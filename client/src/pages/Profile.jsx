import {useDispatch, useSelector } from 'react-redux'
// import { userActions } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
// import { cartActions } from '../redux/cartSlice';s

const Profile = () => {
  // const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate();


  // const logoutHandler = () => {
  //   dispatch(userActions.logout());
  //   dispatch(cartActions.clearCart());
  //   navigate("/");
  // };
  return (
    <div>
      <h1>Welcome Back {user.data.user.name}</h1>
      {/* <button onClick={logoutHandler}>Logout</button> */}
    </div>
  )
}

export default Profile