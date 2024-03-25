import ChatService from '../services/db/chat.service.db.js'

const chatService = new ChatService()

const createMessage = async (req, res) => {
  try {
    const { user, message } = req.body
    const newMessage = await chatService.createMessage({ user, message })
    if (!newMessage) {
      return res.status(400).json({ success: false, error: 'Error creating message' })
    }
    req.io.emit('newMessage', newMessage)

    return res.status(201).json({ success: true })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

export default { createMessage }
