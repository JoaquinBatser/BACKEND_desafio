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
  return <div>{product.title}</div>
}

export default ProductDetail
