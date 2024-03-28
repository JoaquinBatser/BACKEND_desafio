import ProductsManager from '../services/db/products.service.db.js'
import repositories from '../repositories/index.js'
import { productValidator } from '../validation/productValidator.js'
import CustomError from '../services/CustomError.js'

const productManager = new ProductsManager(repositories.products)

const getProducts = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query

    console.log('query', req.query)
    const filter = {
      query: {},
      options: {
        limit,
        page,
      },
    }

    if (sort) {
      filter.options.sort = { price: sort }
    }

    if (category) {
      filter.query = { category }
    }
    const products = await productManager.getProducts(filter)
    if (products.length === 0) {
      throw new CustomError('Products not found', 404)
    }

    res.status(200).json({
      success: true,
      message: 'Products found',
      products: products,
    })
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const productData = await productManager.getProductById(id)
    if (!productData.success) {
      throw new CustomError(productData.message, 404)
    }
    res.status(200).json({
      productData,
    })
  } catch (error) {
    next(error)
  }
}

const addProduct = async (req, res, next) => {
  const { title, description, price, category, thumbnail, code, stock } =
    req.body
  try {
    const productData = await productManager.addProduct({
      title,
      description,
      price,
      category,
      thumbnail,
      code,
      stock,
    })
    console.log('rpidata', productData)
    console.log('rpidataerro', productData.error)

    if (!productData.success) {
      throw new CustomError(productData.error, 400)
    }

    res.status(201).json({
      productData,
    })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { title, description, price, category, thumbnail, code, stock } =
    req.body

  try {
    const productData = await productManager.updateProduct(id, {
      title,
      description,
      price,
      category,
      thumbnail,
      code,
      stock,
    })

    if (!productData.success) {
      throw new CustomError(productData.message, 400)
    }

    res.status(200).json({
      productData,
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const productData = await productManager.deleteProduct(id)

    if (!productData.success) {
      throw new CustomError(productData.message, 404)
    }

    res.status(200).json({
      productData,
    })
  } catch (error) {
    console.log(error)
  }
}

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
}
