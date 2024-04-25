import React from 'react'
import { NavLink } from 'react-router-dom'

const ChatBubble = () => {
  return (
    <NavLink to="/chat">
      <div className="bg-black p-6 border fixed bottom-0 right-0 rounded m-6">
        📩
      </div>
    </NavLink>
  )
}

export default ChatBubble
