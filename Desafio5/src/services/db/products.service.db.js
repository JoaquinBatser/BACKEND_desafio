import { productModel } from '../../dao/models/products.model.js'

export default class ProductsManager {
  async getProducts(limit) {
    try {
      const products = await productModel.find().limit(limit).lean()
      return products
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id).lean()
      return product
    } catch (error) {
      console.log(error)
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new productModel(product)
      const result = await newProduct.save()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct(id, product) {
    try {
      const result = await productModel.updateOne({ _id: id }, product)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(id) {
    try {
      const result = await productModel.findByIdAndDelete(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
