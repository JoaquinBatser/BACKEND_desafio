import { Router } from 'express'
import CartsManager from '../services/db/carts.service.db.js'

const router = Router()

const cartsManager = new CartsManager()

router.get('/', async (req, res) => {
  try {
    const carts = await cartsManager.getCarts()
    res.json(carts)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:cId', async (req, res) => {
  const { cId } = req.params
  try {
    const cart = await cartsManager.getCartById(cId)
    const response = {
      status: 'success',
      message: 'Cart found',
      data: cart,
    }
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    await cartsManager.newCart()
    res.json({
      message: 'Successful new Cart',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error creating cart',
      error: error.message,
    })
  }
})

router.post('/:cId/product/:pId', async (req, res) => {
  const { cId } = req.params
  const { pId } = req.params
  try {
    await cartsManager.addProductToCart(cId, pId)
    res.json({
      message: 'Product updated or added successfully',
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
