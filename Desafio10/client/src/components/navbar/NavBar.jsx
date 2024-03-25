import { NavLink } from 'react-router-dom'
import React, { useContext, useState } from 'react'

const NavBar = ({ data, user, isAdmin }) => {
  const { products } = data
  console.log(user)

  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <nav className="flex justify-between h-14 items-center w-full bg-black/20 px-8 ">
      <NavLink to={'/'}>🔰</NavLink>

      <ul className="flex gap-2">
        {categories.map((category) => {
          return (
            <li className="hover:underline">
              <NavLink to={`/category/${category}`} key={category}>
                <p>{category}</p>
              </NavLink>
            </li>
          )
        })}
      </ul>
      <div>
        {!isAdmin && (
          <div>
            <NavLink to="/cart">Cart</NavLink>
          </div>
        )}
        {user ? (
          <NavLink to="/profile">{user.first_name}</NavLink>
        ) : (
          <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        )}
      </div>
      {user && isAdmin ? <p>Admin</p> : null}
    </nav>
  )
}

export default NavBar
