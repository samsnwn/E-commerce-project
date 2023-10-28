import React from "react";
import {useGoogleLoginMutation} from "../redux/userApiSlice";
import {setCredentials} from "../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode"
import { toast } from "react-toastify";
import googleKey from "../config/google.js"


const GoogleLoginButton = ({ label }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, {isLoading}] = useGoogleLoginMutation()
  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  
  const redirect = sp.get('redirect') || "/"

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  },[redirect, userInfo, navigate])

  const handleCallbackResponse = async(response) => {
    const userObject = jwt_decode(response.credential)
    try {
      const res = await login(userObject).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }

  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: googleKey.clientId,
      callback: handleCallbackResponse 
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
      theme: "outline",
      size: "large",
      shape: "pill",
      text:"continue_with",
      type: "standard",
      logo_alignment: "center"
      }
    )
  }, [])

  return (
    <div className="">
      <div id="signInDiv">
      </div>
    </div>

  );
};

export default GoogleLoginButton;
