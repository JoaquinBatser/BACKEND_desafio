import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../api/fetch'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await fetchProductById(id)
        setProduct(productResponse.data.product)
        console.log(productResponse)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [])
  return (
    <div className="border p-10 bg-neutral-200 w-fit mx-auto mt-12">
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <p>{product.description}</p>

      <p>{product.price}</p>
    </div>
  )
}

export default ProductDetail
