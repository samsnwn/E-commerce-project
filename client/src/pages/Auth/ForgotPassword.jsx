import axios from 'axios'
import { useState } from 'react'
import baseUrl from '../../config/config'

const ForgotPassword = () => {
    const [email, setEmail] = useState()
    const [message, setMessage] = useState()

    const onChangeHandler = (e) => {
        setEmail(e.target.value.trim())
        
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        const res = await axios.post(`${baseUrl}/auth/forgotPassword`, {email})
        if(res) {
            setMessage(res.data.message)
        }
    }

  return (
    <div className="h-[80vh] flex items-center flex-col m-20">
        <form className="flex flex-col mb-10 p-10" onSubmit={submitHandler}>
        <label htmlFor="email">Please enter your email address</label>
        <input type="email" name='email' className='border-2' onChange={onChangeHandler} required/>
        <button type="submit" className="">Send password reset</button>
        </form>
        {message && <h2 >{message}</h2>}
    </div>
  )
}

export default ForgotPassword