import React, { useContext } from 'react'
import axios from 'axios'
import { addProductToCart } from '../../api/fetch'
import { UserContext } from '../../context/UserContext'

const ProductCard = ({ product }) => {
  const { user } = useContext(UserContext)
  const addProduct = async () => {
    const productResponse = await addProductToCart(product.id, user._id)
    console.log(productResponse.data)
  }
  return (
    <div className="relative w-full rounded h-full p-4 shadow hover:shadow-lg transition-all hover:cursor-pointer flex flex-col justify-between">
      <div>
        <img
          className="border mb-4 h-40"
          src={product.image}
          alt={product.title}
        />
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-neutral-400 text-sm">{product.category}</p>
        <p className="my-4">{product.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <button
            className="border hover:bg-neutral-100 transition-all py-2 px-4 rounded"
            onClick={addProduct}
          >
            Add to cart
          </button>
        </div>

        <p className="font-semibold">${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
