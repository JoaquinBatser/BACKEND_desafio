import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { sendPassswordChangeEmail } from '../api/fetch'

const Profile = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="pt-20">
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <p>{user.email}</p>
    </div>
  )
}

export default Profile
