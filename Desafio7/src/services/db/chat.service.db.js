import { messageModel } from '../../models/messages.model.js'

export default class ChatService {
  async createMessage(message) {
    try {
      const newMessage = await messageModel.create(message)
      return newMessage
    } catch (error) {
      console.log(error)
    }
  }
  async findMessages() {
    try {
      const messages = await messageModel.find().lean()
      return messages
    } catch (error) {
      console.log(error)
    }
  }
}
