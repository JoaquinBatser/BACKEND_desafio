import { userModel } from '../../models/user.model.js'
import mongoose from 'mongoose'
import { createHash, isValidPassword } from '../../utils.js'

export default class usersManager {
  async addUser(user) {
    try {
      const { email, password } = user
      let newUser

      if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        newUser = await userModel.create({
          ...user,
          password: createHash(password),
          role: 'admin',
        })
      } else {
        newUser = await userModel.create({ ...user, password: createHash(password) })
      }

      return !newUser
        ? { success: false, message: 'Problem adding new user', user: false }
        : { success: true, message: 'User added', user: newUser }
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
        return { success: false, message: 'Credentials already in use', user: false }
      } else {
        console.error(error)
        return { success: false, message: error, user: false }
      }
    }
  }

  async loginUser({ email, password }) {
    try {
      const user = await userModel.findOne({ email })
      const isValid = isValidPassword(user, password)
      return user && isValid
        ? { success: true, message: 'Successful Login', foundUser: user }
        : { success: false, message: 'Invalid credentials' }
    } catch (error) {
      console.log(error)
    }
  }

  async getByEmail(email) {
    try {
      const user = await userModel.findOne({ email })
      return user ? { success: true, user } : { success: false, message: 'User not found' }
    } catch (error) {
      console.log(error)
    }
  }

  async getUserById(id) {
    try {
      const user = await userModel.findById(id)
      return user ? { success: true, user } : { success: false, message: 'User not found' }
    } catch (error) {
      console.log(error)
    }
  }
}
