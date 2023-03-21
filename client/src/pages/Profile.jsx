import React from 'react'
import {useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(state => state.user.currentUser)
  return (
    <div>
      <h1>Welcome Back {user.data.user.name}</h1>
    </div>
  )
}

export default Profile