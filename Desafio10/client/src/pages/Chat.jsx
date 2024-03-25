import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getMessages, sendSocketMessage } from '../api/fetch'
import io from 'socket.io-client'

const Chat = ({ user }) => {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const chatUser = user ? user.first_name : 'Guest'

  useEffect(() => {
    const newSocket = io('http://localhost:8000')
    setSocket(newSocket)
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages()
        setMessages(messagesData.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
    return () => newSocket.disconnect()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (messageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData])
      })
    }
  }, [socket])

  const sendMessage = async (e) => {
    e.preventDefault()

    if (message.trim()) {
      const messageData = { chatUser, message }
      try {
        const response = await sendSocketMessage({ messageData })
      } catch (error) {
        console.log(error)
      } finally {
        setMessage('')
      }
    }
  }

  console.log(messages)
  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {messages.map((messageData) => (
          <li key={messageData.id}>
            {messageData.chatUser}: {messageData.message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat
