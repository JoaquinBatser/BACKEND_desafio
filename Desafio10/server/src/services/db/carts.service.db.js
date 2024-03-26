import { cartModel } from '../../models/carts.model.js'
import { ticketModel } from '../../models/ticket.model.js'
import mongoose from 'mongoose'

export default class CartsManager {
  constructor(repo) {
    this.repo = repo
  }

  async getCarts() {
    try {
      const carts = await this.repo.get()

      return carts
    } catch (error) {
      console.log(error)
    }
  }

  async getUserCart(userId) {
    try {
      const cart = await this.repo.getUserCart(userId)
      return !cart
        ? { success: false, message: 'Cart not found' }
        : { success: true, message: 'Cart found', cart }
    } catch (error) {
      console.log(error)
    }
  }

  async newCart(userId) {
    try {
      const newCart = await this.repo.new(userId)

      return !newCart
        ? { success: false, message: 'Cart not created' }
        : { success: true, message: 'Cart created', cart: newCart }
    } catch (error) {
      console.log(error)
    }
  }

  async getCartById(cId) {
    try {
      const cart = await this.repo.getById(cId)
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async addProductToCart(cId, pId) {
    try {
      const cart = await this.repo.addToCart(cId, pId)
      return cart
    } catch (error) {
      console.log('Error in addProductToCart:', error)
      throw error
    }
  }

  async updateProductQuantity(cId, pId, quantity) {
    try {
      const cart = await this.repo.updateProductQuantity(cId, pId, quantity)
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProductFromCart(cId, pId) {
    try {
      const cart = await this.repo.deleteProductFromCart(cId, pId)
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async emptyCart(cId) {
    try {
      const cart = await this.repo.emptyCart(cId)
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  async newTicket(ticketData) {
    try {
      const ticket = await this.repo.newTicket(ticketData)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
