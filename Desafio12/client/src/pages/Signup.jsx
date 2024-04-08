import React, { useContext, useState } from 'react'
import { signupUser } from '../api/fetch'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Signup = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signupNewUser = async (e) => {
    e.preventDefault()
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      age: age,
    }
    const user = await signupUser(newUser)
    console.log('signup', user)
    if (user.data.success) {
      setUser(user.data.user)
      navigate('/login')
    }
    console.log(user)
    const { data } = user

    data.success ? navigate('/') : console.log('NUUH')
  }

  return (
    <section className=" w-[1200px] mx-auto pt-16">
      <form
        id="signup-html"
        onSubmit={signupNewUser}
        className="mt-8 border p-12"
      >
        <h2 className="block text-gray-700 text-lg font-bold mb-2">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            onChange={(e) => {
              setLastName(e.target.value)
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Edad:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={(e) => {
              setAge(e.target.value)
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
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
        </div>
        <button
          id="signup"
          type="submit"
          className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </section>
  )
}

export default Signup
