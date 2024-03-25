import { messageModel } from '../../models/messages.model.js'

export default class ChatService {
  constructor(repo) {
    this.repo = repo
  }
  async createMessage(message) {
    try {
      const newMessage = await this.repo.create(message)
      return newMessage
    } catch (error) {
      console.log(error)
    }
  }
  async findMessages() {
    try {
      const messages = await this.repo.get()
      return messages
    } catch (error) {
      console.log(error)
    }
  }
}
