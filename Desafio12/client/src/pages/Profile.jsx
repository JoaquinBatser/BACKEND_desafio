import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Profile = () => {
  const { user } = useContext(UserContext)
  const logoutFunction = async () => {}
  return (
    <div>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <p>{user.email}</p>
      <button onClick={logoutFunction}></button>
    </div>
  )
}

export default Profile
