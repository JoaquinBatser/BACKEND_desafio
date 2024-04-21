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
import { UserContext, UserProvider } from './context/UserContext.jsx'
import Products from './pages/Products.jsx'
import NewProduct from './pages/newProduct.jsx'
import ChangePassword from './pages/ChangePassword.jsx'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/products" element={<Products />} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route path="/passwordChange/:token" element={<ChangePassword />} />
      </Routes>
    </UserProvider>
  )
}

export default App
