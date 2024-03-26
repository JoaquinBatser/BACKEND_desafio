import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../../api/fetch'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList'

const ProductListContainer = () => {
  const [productsData, setProductsData] = useState([])
  const [category, setCategory] = useState('')
  console.log(category)

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsResponse = await fetchProducts(category)

        console.log(productsResponse.data.products.docs)
        setProductsData(productsResponse.data)
      } catch (error) {}
    }
    fetchProductsData()
  }, [category])

  return (
    <div>
      {productsData.success ? (
        <section className="w-[1200px] m-auto">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="accessories">accessories</option>
            <option value="clothing">clothing</option>
            <option value="home">home</option>
            <option value="electronics">electronics</option>
          </select>
          <ProductList products={productsData.products} />
        </section>
      ) : (
        // <div>products</div>
        <div>loading--</div>
      )}
    </div>
  )
}

export default ProductListContainer
