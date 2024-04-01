import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getMessages, sendSocketMessage } from '../api/fetch'
import io from 'socket.io-client'
import { UserContext } from '../context/UserContext'

const Chat = () => {
  const { user } = useContext(UserContext)
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
        console.log(messagesData)
        setMessages(messagesData.data.messagesData.messages)
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
    <div className="w-[1200px] m-auto">
      <h2 className="">Chat</h2>
      <ul className=" space-y-2 mb-12">
        {messages.map((messageData) => (
          <li key={messageData.id} className="border py-2 px-4 w-fit">
            <span className="font-bold text-neutral-900  ">
              {messageData.chatUser}
            </span>
            : {messageData.message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="fixed h-12 bottom-0 ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className=" px-4 mr-4 py-2 rounded border "
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded shadow"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
