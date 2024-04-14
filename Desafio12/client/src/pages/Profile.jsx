import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { sendPassswordChangeEmail } from '../api/fetch'

const Profile = () => {
  const { user } = useContext(UserContext)
  const logoutFunction = async () => {}
  const changePassword = async () => {
    await sendPassswordChangeEmail(user.email)
  }
  return (
    <div className="pt-20">
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <p>{user.email}</p>
      <button onClick={logoutFunction}></button>
      <button onClick={changePassword}>ChangePassword</button>
    </div>
  )
}

export default Profile
