import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import CartItems from '../components/Cart/CartItems'
import { createCart, getCart, getUser, getUserCart } from '../api/fetch'
import { emptyCart } from '../api/fetch'
import { UserContext } from '../context/UserContext'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  const [cartData, setCartData] = useState([])
  const [cartProducts, setCartProducts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await getUserCart(user._id)
        setCartData(cartResponse.data)
        setCartProducts(cartResponse.data.cart.products)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCart()
  }, [])

  const emptyThisCart = async () => {
    try {
      await emptyCart()
      const cartResponse = await getCart()
      setCartData(cartResponse.data)
      setCartProducts(cartResponse.data.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user ? (
        <div>
          <p>{user.first_name}'s Cart</p>
          {cartProducts.map((product) => (
            <CartItems product={product} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Log in to see your cart</h2>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      )}
    </>
  )
}

export default Cart
