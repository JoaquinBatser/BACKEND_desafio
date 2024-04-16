import React, { useContext, useState } from 'react'
import { getUser, sendPassswordChangeEmail } from '../api/fetch'
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
    console.log(fetchUser)
    if (fetchUser.data.success) {
      setUser(fetchUser.data.user)
      navigate('/')
    } else {
      console.log('NUUH')
    }
  }

  const ForgotPassword = async () => {
    try {
      console.log('fetch', email)
      const updateData = await sendPassswordChangeEmail(email)
      console.log(updateData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className=" w-[1200px] mx-auto pt-16">
      <form id="signup-html" onSubmit={logUser} className="mt-8 border p-12">
        <h2 className="block text-gray-700 text-lg font-bold mb-2">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            User:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button onClick={ForgotPassword}>Forgot password?</button>
        </div>
        <button
          id="signup"
          type="submit"
          className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </section>
  )
}

export default Login
