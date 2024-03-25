import { userModel } from '../../models/user.model.js'
import mongoose from 'mongoose'
import { createHash, isValidPassword } from '../../utils.js'

export default class UsersManager {
  constructor(repo) {
    this.repo = repo
  }
  async addUser(user) {
    console.log('service')
    try {
      const newUser = await this.repo.add(user)
      return !newUser
        ? { success: false, message: 'Problem adding new user', user: false }
        : { success: true, message: 'User added', user: newUser }
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.email === 1
      ) {
        return {
          success: false,
          message: 'Credentials already in use',
          user: false,
        }
        // } else if (error instanceof ValidationError) {
        //   return { success: false, message: error, user: false }
      } else {
        console.error(error)
        return { success: false, message: error, user: false }
      }
    }
  }

  async loginUser({ email, password }) {
    try {
      console.log(email, password)

      const userLogin = await this.repo.login({ email, password })
      console.log('userLogin', userLogin)
      return userLogin
        ? { success: true, message: 'Successful Login', foundUser: userLogin }
        : { success: false, message: 'Invalid credentials' }
    } catch (error) {
      console.log(error)
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.repo.getByEmail(email)
      return user
        ? { success: true, user }
        : { success: false, message: 'User not found' }
    } catch (error) {
      console.log(error)
    }
  }

  async getUserById(id) {
    try {
      const user = await this.repo.getById(id)
      return user
        ? { success: true, user }
        : { success: false, message: 'User not found' }
    } catch (error) {
      console.log(error)
    }
  }
}
