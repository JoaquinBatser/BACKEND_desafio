import { NavLink } from 'react-router-dom'
import React, { useContext, useState } from 'react'

const NavBar = ({ data, user, isAdmin }) => {
  const { products } = data
  console.log(user)

  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <nav>
      <NavLink to={'/'}>
        <p>TITLE</p>
      </NavLink>

      {!isAdmin && (
        <div>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/chat">Chat</NavLink>
        </div>
      )}

      {categories.map((category) => {
        return (
          <NavLink to={`/category/${category}`} key={category}>
            <p>{category}</p>
          </NavLink>
        )
      })}
      <div>
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
