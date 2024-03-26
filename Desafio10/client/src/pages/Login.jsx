import React, { useContext, useState } from 'react'
import { getUser } from '../api/fetch'
import { loginUser } from '../api/fetch'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const logUser = async (e) => {
    e.preventDefault()

    const userData = { email, password }
    const fetchUser = await loginUser({ userData })
    if (fetchUser.data.success) {
      setUser(fetchUser.data.user)
      navigate('/')
    } else {
      console.log('NUUH')
    }
  }

  return (
    <form id="signup-html" onSubmit={logUser}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">user:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </div>

      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <button id="signup" type="submit">
        Register
      </button>
    </form>
  )
}

export default Login
