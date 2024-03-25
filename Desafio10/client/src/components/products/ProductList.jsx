import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ products, category, isAdmin }) => {
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products

  return (
    <ul className="w-[1200px] m-auto grid grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
      {filteredProducts.map((product) => (
        <li>
          <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
        </li>
      ))}
    </ul>
  )
}

export default ProductList
