import React, { useState } from 'react'
import { addNewProduct } from '../api/fetch'

const NewProduct = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [code, setCode] = useState('')
  const [stock, setStock] = useState('')
  const [product, setProduct] = useState({})

  const addProduct = async (e) => {
    e.preventDefault()

    const newProduct = {
      title,
      description,
      price,
      category,
      thumbnail,
      code,
      stock,
    }

    const productResponse = await addNewProduct(newProduct)

    if (productResponse.data.productData.success) {
      setProduct(productResponse.data.productData.product)
    }

    console.log(productResponse)
  }
  return (
    <section className="flex flex-col py-20 justify-center items-center">
      <form onSubmit={addProduct} className="flex flex-col gap-4 w-1/4">
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="p-2 border border-neutral-300"
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          className="p-2 border border-neutral-300"
        />
        <label htmlFor="price">Price</label>
        <input
          onChange={(e) => {
            setPrice(e.target.value)
          }}
          type="text"
          id="price"
          name="price"
          placeholder="Price"
          className="p-2 border border-neutral-300"
        />
        <label htmlFor="category">Category</label>
        <input
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          type="text"
          id="category"
          name="category"
          placeholder="Category"
          className="p-2 border border-neutral-300"
        />
        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          onChange={(e) => {
            setThumbnail(e.target.value)
          }}
          type="text"
          id="thumbnail"
          name="thumbnail"
          placeholder="Thumbnail"
          className="p-2 border border-neutral-300"
        />
        <label htmlFor="code">Code</label>
        <input
          onChange={(e) => {
            setCode(e.target.value)
          }}
          type="text"
          id="code"
          name="code"
          placeholder="Code"
          className="p-2 border border-neutral-300"
        />
        <label htmlFor="stock">Stock</label>
        <input
          onChange={(e) => {
            setStock(e.target.value)
          }}
          type="text"
          id="stock"
          name="stock"
          placeholder="Stock"
          className="p-2 border border-neutral-300"
        />
        <button className="bg-primary-400 text-white p-2 rounded-md">
          Add product
        </button>
      </form>
      {product && (
        <div>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <p>{product.thumbnail}</p>
          <p>{product.code}</p>
          <p>{product.stock}</p>
        </div>
      )}
    </section>
  )
}

export default NewProduct
// title, description, price, category, thumbnail, code, stock
