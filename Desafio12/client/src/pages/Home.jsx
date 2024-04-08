import React, { useContext } from 'react'
import ProductList from '../components/products/ProductList'
import ProductListContainer from '../components/products/ProductListContainer'
import { UserContext } from '../context/UserContext'
import ChatBubble from '../components/ChatBubble'
import Hero from '../components/Hero'
import Featured from '../components/Featured'

const Home = () => {
  const { user } = useContext(UserContext)
  return (
    <main className="">
      {user && user.role === 'user' && <ChatBubble />}
      <Hero />
      <Featured />
    </main>
  )
}

export default Home
