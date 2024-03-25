import { cartModel } from '../../dao/models/carts.model.js'

export default class CartsManager {
  async getCarts() {
    try {
      const carts = await cartModel.find().lean()
      return carts
    } catch (error) {
      console.log(error)
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id).lean()
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async newCart() {
    try {
      const newCart = new cartModel()
      const result = await newCart.save()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId)
      const { products } = cart
      const productIndex = products.findIndex(product => product.product === productId)

      if (productIndex !== -1) {
        products[productIndex].quantity++
      } else {
        products.push({
          product: productId,
          quantity: 1,
        })
      }
      const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products }, { new: true })
      const result = await updatedCart.save()
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
