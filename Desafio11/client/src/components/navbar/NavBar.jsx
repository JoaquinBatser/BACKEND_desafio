import { NavLink } from 'react-router-dom'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../../api/fetch'
import { UserContext } from '../../context/UserContext'

const NavBar = () => {
  const { user } = useContext(UserContext)

  console.log('user', user)

  return (
    <nav className="flex justify-between h-14 items-center w-full bg-black/20 px-8 ">
      <NavLink to={'/'}>🔰</NavLink>

      <div className="flex gap-4 items-center">
        <div>
          <NavLink to="/cart">Cart</NavLink>
        </div>

        {user ? (
          <>
            <NavLink to="/profile">{user.first_name}</NavLink>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
