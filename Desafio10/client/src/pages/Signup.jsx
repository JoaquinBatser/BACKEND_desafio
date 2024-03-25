import React, { useState } from 'react'
import { singupUser } from '../api/fetch'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signupUser = async (e) => {
    e.preventDefault()
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      age: age,
    }
    const user = await singupUser({ newUser })
    console.log(user)
    const { data } = user

    data.success ? navigate('/') : console.log('NUUH')
  }

  return (
    <div>
      <form id="signup-html" onSubmit={signupUser}>
        <h2>Register</h2>
        <div>
          <label htmlFor="first_name">Nombre:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="last_name">Apellido:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={(e) => {
              setAge(e.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
    </div>
  )
}

export default Signup
