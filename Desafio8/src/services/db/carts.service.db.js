import { cartModel } from '../../models/carts.model.js'
import mongoose from 'mongoose'

export default class CartsManager {
  async getCarts() {
    try {
      const carts = await cartModel.find().lean()
      console.log(carts)
      return carts
    } catch (error) {
      console.log(error)
    }
  }

  async newCart() {
    try {
      const newCart = await cartModel.create({})
      return newCart
    } catch (error) {
      console.log(error)
    }
  }

  async getCartById(cId) {
    try {
      const cart = await cartModel.findById(cId).lean()
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async addProductToCart(cId, pId) {
    try {
      const productExistsInCart = await cartModel.exists({ _id: cId, 'products.product': pId })
      let cart
      if (!productExistsInCart) {
        cart = await cartModel
          .findByIdAndUpdate(
            cId,
            { $push: { products: { product: pId, quantity: 1 } } },
            { new: true }
          )
          .lean()
      } else {
        cart = await cartModel
          .findOneAndUpdate(
            { _id: cId, 'products.product': pId },
            { $inc: { 'products.$.quantity': 1 } },
            { new: true }
          )
          .lean()
      }

      return cart
    } catch (error) {
      console.log('Error in addProductToCart:', error)
      throw error
    }
  }

  async updateProductQuantity(cId, pId, quantity) {
    try {
      const productExistsInCart = await cartModel.exists({ _id: cId, 'products.product': pId })

      if (!productExistsInCart) {
        throw new Error('Product not found in cart')
      }

      const cart = await cartModel
        .findOneAndUpdate(
          { _id: cId, 'products.product': pId },
          { $set: { 'products.$.quantity': quantity } },
          { new: true }
        )
        .lean()
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProductFromCart(cId, pId) {
    try {
      const cart = await cartModel
        .findByIdAndUpdate(cId, { $pull: { products: { product: pId } } }, { new: true })
        .lean()

      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async emptyCart(cId) {
    try {
      const cart = await cartModel
        .findByIdAndUpdate(cId, { $set: { products: [] } }, { new: true })
        .lean()
      return cart
    } catch (error) {
      console.log(error)
    }
  }
}
