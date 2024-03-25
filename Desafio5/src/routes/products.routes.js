import { Router } from 'express'
import ProductManager from '../services/db/products.service.db.js'

const productsRouter = Router()

const productManager = new ProductManager()

productsRouter.get('/', async (req, res) => {
  try {
    const { limit } = req.query
    const products = await productManager.getProducts(limit)
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'Products not found' })
    }
    res.json(products)
  } catch (error) {
    console.log(error)
  }
})

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await productManager.getProductById(id)
    const response = {
      status: 'success',
      message: 'Product found',
      data: product,
    }
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

productsRouter.post('/', async (req, res) => {
  const { title, description, price, category, thumbnail, code, stock } = req.body
  try {
    const product = await productManager.addProduct({
      title,
      description,
      price,
      category,
      thumbnail,
      code,
      stock,
    })
    const response = {
      status: 'success',
      message: 'Product created',
      data: product,
    }
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

productsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, price, category, thumbnail, code, stock } = req.body

  try {
    await productManager.updateProduct(id, {
      title,
      description,
      price,
      category,
      thumbnail,
      code,
      stock,
    })
    const response = {
      status: 'success',
      message: 'Product updated',
    }
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await productManager.deleteProduct(id)
    const response = {
      status: 'success',
      message: 'Product deleted',
    }
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

export default productsRouter
