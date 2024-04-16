import axios from 'axios'

export const fetchProducts = async (category) => {
  try {
    console.log('params', category)
    const data = await axios.get('/api/products', { params: { category } })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchProductById = async (productId) => {
  try {
    const data = await axios.get(`/api/products/${productId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const addNewProduct = async (newProduct) => {
  try {
    const data = await axios.post('/api/products', newProduct)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const signupUser = async (newUser) => {
  try {
    console.log('newUsefecthr', newUser)
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

export const sendPassswordChangeEmail = async (email) => {
  try {
    console.log('fetch', email)
    const data = await axios.get(`/api/sessions/password/change/${email}`)

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updatePassword = async (info) => {
  try {
    const email = info.email
    const newPassword = info.newPassword
    const token = info.token

    console.log('info', info)
    console.log('email', email)
    console.log('newPassword', newPassword)

    const body = {
      email,
      newPassword,
    }
    const data = await axios.put(`/api/sessions/password/change/${token}`, body)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async () => {
  try {
    const data = await axios.get('/api/sessions/current')
  } catch (error) {
    console.log(error)
  }
}

export const createCart = async (userId) => {
  try {
    const data = await axios.post('/api/carts', { userId: userId })
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

export const getUserCart = async (userId) => {
  try {
    console.log('userId', userId)
    const data = await axios.get(`/api/carts/user/${userId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const addProductToCart = async (productId, cartId) => {
  try {
    const data = await axios.post(`api/carts/${cartId}/product/${productId}/`)
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
