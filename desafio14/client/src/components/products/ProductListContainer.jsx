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

        console.log(productsResponse.data.productsData.products.docs)
        setProductsData(productsResponse.data.productsData)
      } catch (error) {}
    }
    fetchProductsData()
  }, [category])

  return (
    <div>
      {productsData.success ? (
        <section className="w-[1200px] mx-auto pt-16">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Audio">Audio</option>
            <option value="Charging">Charging</option>
            <option value="Accessories">Accessories</option>
            <option value="Gaming">Gaming</option>
            <option value="Wearables">Wearables</option>
            <option value="Photography">Photography</option>
            <option value="Fitness">Fitness</option>
            <option value="Car Accessories">Car Accessories</option>
            <option value="Office">Office</option>
            <option value="Smart home">Smart Home</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Storage">Storage</option>
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
