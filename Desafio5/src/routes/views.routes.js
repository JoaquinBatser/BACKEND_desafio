import { Router } from 'express'
import ProductsManager from '../services/db/products.service.db.js'
import CartsManager from '../services/db/carts.service.db.js'
import ChatService from '../services/db/chat.service.db.js'

const viewsRouter = Router()

viewsRouter.get('/products', async (req, res) => {
  try {
    const productsManager = new ProductsManager()
    const products = await productsManager.getProducts()
    res.render('products', { products })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

viewsRouter.get('/carts', async (req, res) => {
  try {
    const cartManager = new CartsManager()
    const carts = await cartManager.getCarts()
    res.render('carts', { carts })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

viewsRouter.get('/chat', async (req, res) => {
  const chatService = new ChatService()
  const messages = await chatService.findMessages()
  res.render('chat', { title: 'Chat', messages, style: 'css/chat.css' })
})

export default viewsRouter
