import { NavLink } from 'react-router-dom'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../../api/fetch'
import { UserContext } from '../../context/UserContext'

const NavBar = () => {
  const { user } = useContext(UserContext)

  console.log('user', user)

  return (
    <nav className="flex justify-between fixed h-14 items-center  w-full border-neutral-400 border-b px-8 z-12 ">
      <NavLink to={'/'}>O</NavLink>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <NavLink to="/profile">{user.first_name}</NavLink>
            {user.role === 'admin' && (
              <NavLink to="/newProduct">Add product</NavLink>
            )}
          </>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        )}

        <div className="flex gap-4 items-center">
          <div>
            <NavLink to="/cart">👜</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
