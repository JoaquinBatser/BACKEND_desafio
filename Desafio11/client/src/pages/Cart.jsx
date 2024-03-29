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
        const userId = user._id
        console.log(userId)
        const cartResponse = await getUserCart(userId)
        console.log(cartResponse)

        if (cartResponse.data.success === false) {
          console.log(userId)

          const newCart = await createCart(userId)
          console.log(newCart)
          const userCart = await getUserCart(userId)
          console.log('useccart', userCart)
          setCartData(userCart.data)
          setCartProducts(userCart.data.cart.products)
          return
        }

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
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="block text-gray-700 text-lg font-bold mb-2">
            {user.first_name}'s Cart
          </p>
          {cartProducts.map((product) => (
            <CartItems product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
          <h2 className="block text-gray-700 text-lg font-bold mb-2">
            Log in to see your cart
          </h2>
          <NavLink
            to="/login"
            className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Signup
          </NavLink>
        </div>
      )}
    </>
  )
}

export default Cart
