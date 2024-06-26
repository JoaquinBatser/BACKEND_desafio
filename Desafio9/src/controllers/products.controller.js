import ProductManager from '../services/db/products.service.db.js'

const productManager = new ProductManager()

const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query

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
      return res
        .status(404)
        .json({ success: false, message: 'Products not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Products found',
      products: products.docs,
    })
  } catch (error) {
    console.log(error)
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params
  try {
    const data = await productManager.getProductById(id)
    const response = {
      message: data.message,
      product: data.product,
    }
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

const addProduct = async (req, res) => {
  const { title, description, price, category, thumbnail, code, stock } =
    req.body
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
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { title, description, price, category, thumbnail, code, stock } =
    req.body

  try {
    const data = await productManager.updateProduct(id, {
      title,
      description,
      price,
      category,
      thumbnail,
      code,
      stock,
    })

    const response = {
      message: data.message,
      product: data.product,
    }

    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const data = await productManager.deleteProduct(id)
    const response = {
      message: data.message,
    }
    res.json(response)
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
