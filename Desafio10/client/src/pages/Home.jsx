import React, { useContext } from 'react'
import ProductList from '../components/products/ProductList'
import ProductListContainer from '../components/products/ProductListContainer'
import { UserContext } from '../context/UserContext'
import ChatBubble from '../components/ChatBubble'

const Home = () => {
  const { user } = useContext(UserContext)
  console.log(user)
  return (
    <main>
      {user && user.role === 'user' && <ChatBubble />}

      <ProductListContainer />
    </main>
  )
}

export default Home
