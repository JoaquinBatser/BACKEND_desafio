import { userModel } from '../../models/user.model.js'
import mongoose from 'mongoose'

export default class usersManager {
  async addUser(user) {
    try {
      const newUser = new userModel(user)
      const result = await newUser.save()
      return !result
        ? { success: false, message: 'Problem adding new user' }
        : { success: true, message: 'User added', user: result }
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
        return { message: 'Credentials already in use' }
      } else {
        console.error(error)
        return { success: false, message: 'Internal server error' }
      }
    }
  }

  async getUser({ email, password }) {
    try {
      const user = await userModel.findOne({ email, password })
      return !user
        ? { success: false, message: 'Invalid credentials' }
        : { success: true, message: 'Successful Login', foundUser: user }
    } catch (error) {
      console.log(error)
    }
  }
}
