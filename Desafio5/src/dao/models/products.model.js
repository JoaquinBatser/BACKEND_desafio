import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, min: 0 },
})

export const productModel = mongoose.model(productCollection, productSchema)
