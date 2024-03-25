import React, { useState } from 'react'

const CartItems = ({ product }) => {
  return (
    <div>
      <div>{product.product.title}</div>
      <div>{product.quantity}</div>
    </div>
  )
}

export default CartItems
