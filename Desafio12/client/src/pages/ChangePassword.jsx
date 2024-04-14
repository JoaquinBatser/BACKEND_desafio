import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { updatePassword } from '../api/fetch'

const ChangePassword = () => {
  const { user } = useContext(UserContext)
  const { token } = useParams()
  const [newPassword, setNewPassword] = useState('')
  console.log(user)
  const userId = user._id

  const changePassword = async () => {
    const passwordData = await updatePassword(token, newPassword, userId)
    console.log(passwordData)
  }

  return (
    <div className="pt-20">
      <h1>Change your password</h1>
      <input
        type="text"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={changePassword}>Change</button>
    </div>
  )
}

export default ChangePassword
