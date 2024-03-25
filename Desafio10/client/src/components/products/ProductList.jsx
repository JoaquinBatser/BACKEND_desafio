import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ products, category, isAdmin }) => {
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products

  return (
    <ul className="products-list">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
      ))}
    </ul>
  )
}

export default ProductList
