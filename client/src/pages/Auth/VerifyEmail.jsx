import { useState } from 'react'
import Button from '../../components/UI/Button'
import {useLocation, Link} from "react-router-dom"
// import { useVerifyEmailMutation } from '../../redux/userApiSlice'
import axios from 'axios'

const VerifyEmail = () => {
  // const [verifyEmail, {isLoading}] = useVerifyEmailMutation()
  const location = useLocation()
  const userId = location.pathname.split('/')[2]

  const [isUserVerified, setIsUserVerified] = useState(false)
  const [message, setMessage] = useState()


  const submitHandler = async() => {
    try {
      // const res = await verifyEmail(userId).unwrap()
      const res = await axios.patch(`http://localhost:5000/api/auth/emailVerification/${userId}`, userId)
      setIsUserVerified(true)
      setMessage(res.data.message)
      console.log(res)
    } catch (error) {
      console.log(error)
      setIsUserVerified(false)
    }
  }

  return (<>
  {isUserVerified ? (<div><p>{message}</p><Link to="/login">Go to Login</Link></div>) : (<Button label="VerifyEmail" onClick={submitHandler}></Button>)}
  </>
    
  )
}

export default VerifyEmail