import React, { useState } from 'react'

const CartItems = ({ product }) => {
  return (
    <div className="relative w-full rounded h-full p-4 shadow hover:shadow-lg transition-all hover:cursor-pointer flex flex-col justify-between">
      <div>
        <img
          className="border mb-4 h-40"
          src={product.product.image}
          alt={product.product.title}
        />
        <h3 className="font-semibold">{product.product.title}</h3>
        <p className="text-neutral-400 text-sm">{product.product.category}</p>
        <p className="my-4">{product.product.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-semibold">${product.product.price}</p>
      </div>
      <div>Quantity: {product.quantity}</div>
    </div>
  )
}

export default CartItems
