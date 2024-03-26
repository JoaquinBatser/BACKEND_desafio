import React from 'react'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import { NavLink } from 'react-router-dom'

const ProductList = ({ products }) => {
  const { docs } = products
  return (
    <ul className=" grid grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
      {docs.map((product) => (
        <li>
          {/* <NavLink to={`/product/${product.id}`}> */}
          <ProductCard key={product.id} product={product} />
          {/* </NavLink> */}
        </li>
      ))}
    </ul>
  )
}

export default ProductList
