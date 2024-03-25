import React from 'react'
import axios from 'axios'
import { addProductToCart } from '../../api/fetch'

const ProductCard = ({ product, isAdmin }) => {
  const addProduct = async () => {
    const productResponse = await addProductToCart(product.id)
    console.log(productResponse.data)
  }
  return (
    <div>
      <div>
        <h2>{product.title}</h2>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
        <p>{product.price}</p>
      </div>
      {!isAdmin && (
        <div>
          <button onClick={addProduct}>Add to cart</button>
        </div>
      )}
    </div>
  )
}

export default ProductCard
