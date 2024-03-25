import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CartItems from '../components/Cart/CartItems'
import { createCart, getCart, getUser } from '../api/fetch'
import { emptyCart } from '../api/fetch'

const Cart = () => {
  const [cartData, setCartData] = useState([])
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await getCart()
        setCartData(cartResponse.data)
        setCartProducts(cartResponse.data.data.products)
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

  const createNewCart = async () => {
    try {
      await createCart()
      const cartResponse = await getCart()
      setCartData(cartResponse.data)
      setCartProducts(cartResponse.data.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Cart</h1>
      <button onClick={emptyThisCart}>empty</button>
      <button onClick={createNewCart}>create</button>
      {cartData ? (
        <div>
          {cartProducts.map((product) => (
            <CartItems product={product} />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Cart
