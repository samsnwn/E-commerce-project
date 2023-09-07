import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Page from "../components/UI/Page";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config/config";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import { useProfileMutation } from "../redux/userApiSlice";
import { useGetMyOrdersQuery } from "../redux/ordersApiSlice";
import { setCredentials } from "../redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(userInfo.data);
    if (password !== confirmPassword) {
      toast.error("Paswords do not match");
    }
    try {
      const res = await updateProfile({
        _id: userInfo.data.id,
        name,
        email,
        password,
      }).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Page className="">
      <h1>Welcome Back {userInfo.data.name}</h1>
      <Container>
        <form
          action=""
          className="flex flex-col mt-4 text-black"
          onSubmit={submitHandler}
        >
          <label htmlFor="name">Name:</label>
          <input
            label="name"
            className="input"
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="input"
            type="email"
            label="Email"
          />
          {/* <label htmlFor="password">New Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            className="input"
            label="password"
          />
          <label htmlFor="passwordConfirm">Confirm New Password:</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="passwordConfirm"
            type="email"
            className="input"
            label="passwordConfirm"
          /> */}
          <button className="w-[40%] py-2 px-3 bg-teal-200" type="submit">
            Update
          </button>
        </form>
        {/* <button className="w-[40%] py-2 px-3 bg-teal-200" type="button">
          Change password
        </button> */}
        {loadingUpdateProfile && <Loader />}
        <div>
          <h2>My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div>
              {orders ? (
                orders.map((order, i) => (
                  <div key={order._id}>
                    <h3>{order._id}</h3>
                  </div>
                ))
              ) : (
                <h2>You dont have any orders yet</h2>
              )}
            </div>
          )}
        </div>
      </Container>
    </Page>
  );
};

export default Profile;
