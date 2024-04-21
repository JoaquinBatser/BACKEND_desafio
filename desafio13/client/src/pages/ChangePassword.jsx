import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { updatePassword } from '../api/fetch'

const ChangePassword = () => {
  const { token } = useParams()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const changePassword = async (e) => {
    e.preventDefault()
    const info = { email, newPassword, token }
    console.log(info)
    const passwordData = await updatePassword(info)
    console.log(passwordData)
  }

  return (
    <div className="pt-20">
      <form>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={changePassword}>Change Password</button>
      </form>
    </div>
  )
}

export default ChangePassword
