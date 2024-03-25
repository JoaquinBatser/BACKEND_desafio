import React from 'react'
import ProductList from '../components/products/ProductList'

const Home = ({ data, isAdmin }) => {
  return (
    <main>
      {data.success ? (
        <ProductList products={data.products} isAdmin={isAdmin} />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}

export default Home
