import axios from 'axios'

export const fetchProducts = async () => {
  try {
    const data = await axios.get('/api/products')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const singupUser = async ({ newUser }) => {
  try {
    const data = await axios.post('/api/sessions/signup', newUser)
    return data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access:', error.message)
    } else {
      console.error('Other Axios error:', error.message)
    }
  }
}

export const loginUser = async ({ userData }) => {
  try {
    const data = await axios.post('/api/sessions/login', userData)
    return data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access:', error.message)
    } else {
      console.error('Other Axios error:', error.message)
    }
  }
}

export const getUser = async () => {
  try {
    const data = await axios.get('/api/sessions/current')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createCart = async () => {
  try {
    const data = await axios.post('/api/carts')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getCart = async ({ cartId }) => {
  try {
    const data = await axios.get(`/api/carts/${cartId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const addProductToCart = async (productId) => {
  try {
    const data = await axios.post(
      `api/carts/65f8c3f6c77a348bcd692740/product/${productId}/`
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const sendSocketMessage = async ({ messageData }) => {
  try {
    const data = await axios.post('/api/chat', messageData)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getMessages = async () => {
  try {
    const data = await axios.get('/api/chat')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const emptyCart = async () => {
  try {
    const data = await axios.delete('/api/carts/65f8c3f6c77a348bcd692740')
    return data
  } catch (error) {
    console.log(error)
  }
}
