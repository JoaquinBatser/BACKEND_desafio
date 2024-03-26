import { useContext, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { createCart, fetchProducts, getUser } from './api/fetch'
import NavBar from './components/navbar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Categories from './pages/Categories'
import Cart from './pages/Cart'
import Chat from './pages/Chat'
import ChatBubble from './components/ChatBubble.jsx'
import ProductDetail from './components/products/ProductDetail.jsx'
import ProductList from './components/products/ProductList.jsx'
import ProductListContainer from './components/products/ProductListContainer.jsx'
import { UserProvider } from './context/UserContext.jsx'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  const [filter, setFilter] = useState([])
  const [data, setData] = useState([])
  const [user, setUser] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetchProducts()

        setData(productsResponse.data)
      } catch (error) {}
    }
    fetchData()
  }, [])

  return (
    <UserProvider>
      <NavBar />

      <ChatBubble />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/chat" element={<Chat user={user} />} />
      </Routes>
    </UserProvider>
  )
}

export default App
