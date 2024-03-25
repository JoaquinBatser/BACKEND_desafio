import { productModel } from '../../models/products.model.js'
import mongoose from 'mongoose'
export default class ProductsManager {
  constructor(repo) {
    this.repo = repo
  }
  async getProducts(filter) {
    try {
      filter.options.lean = true
      const products = await productModel.paginate(filter.query, filter.options)
      return products
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById(id) {
    try {
      const product = await this.repo.getById(id)

      return !product
        ? { success: false, message: 'Product not found' }
        : { success: true, message: 'Product found', product }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return { success: false, message: 'Invalid ID format' }
      } else {
        return { success: false, message: 'An error occurred' }
      }
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await this.repo.add(product)
      return !newProduct
        ? { success: false, message: 'Product not added' }
        : { success: true, message: 'Product added', product: newProduct }
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct(id, productUpdate) {
    try {
      const product = this.repo.update(id, productUpdate)
      return !product
        ? { success: false, message: 'Product not found' }
        : { success: true, message: 'Product updated', product }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return { success: false, message: 'Invalid ID format' }
      } else {
        return { success: false, message: 'An error occurred' }
      }
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.repo.delete(id)
      return !product
        ? { success: false, message: 'Product not found' }
        : { success: true, message: 'Product deleted successfully', product }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return { success: false, message: 'Invalid ID format' }
      } else {
        return { success: false, message: 'An error occurred' }
      }
    }
  }
}
