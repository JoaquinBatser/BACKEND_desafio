import repositories from '../repositories/index.js'
import ChatService from '../services/db/chat.service.db.js'

const chatService = new ChatService(repositories.messages)

const createMessage = async (req, res) => {
  try {
    const { chatUser, message } = req.body
    const newMessage = await chatService.createMessage({ chatUser, message })
    if (!newMessage) {
      return res
        .status(400)
        .json({ success: false, error: 'Error creating message' })
    }
    req.io.emit('newMessage', newMessage)

    return res.status(201).json({ success: true })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const getMessages = async (req, res) => {
  try {
    const messages = await chatService.findMessages()
    console.log('measdasd', messages)
    if (!messages) {
      return res
        .status(400)
        .json({ success: false, error: 'Error fetching messages' })
    }
    return res.status(200).json({ success: true, data: messages })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

export default { createMessage, getMessages }
