import { NavLink } from 'react-router-dom'
import React, { useContext, useState } from 'react'

const NavBar = () => {
  return (
    <nav className="flex justify-between h-14 items-center w-full bg-black/20 px-8 ">
      <NavLink to={'/'}>🔰</NavLink>

      <div>
        <div>
          <NavLink to="/cart">Cart</NavLink>
        </div>

        <NavLink to="/profile">username</NavLink>

        <div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
