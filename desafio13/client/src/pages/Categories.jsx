import React from 'react'
import ProductList from '../components/products/ProductList'
import { useParams } from 'react-router-dom'

const Categories = ({ data, isAdmin }) => {
  const { category } = useParams()
  return (
    <main>
      {data.success ? (
        <ProductList
          products={data.products}
          category={category}
          isAdmin={isAdmin}
        />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}

export default Categories
