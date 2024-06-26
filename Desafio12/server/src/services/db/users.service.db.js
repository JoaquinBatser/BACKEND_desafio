import { userModel } from '../../models/user.model.js'
import mongoose from 'mongoose'
import { createHash, isValidPassword } from '../../utils.js'
import bcrypt from 'bcrypt'

export default class UsersManager {
  constructor(repo) {
    this.repo = repo
    this.addUser = this.addUser.bind(this)
  }
  async addUser(user) {
    if (!this.repo) {
      console.error('Repository is not defined')
      return { success: false, message: 'Repository is not defined' }
    }
    try {
      const newUser = await this.repo.add(user)

      return !newUser
        ? { success: false, message: newUser.message, user: false }
        : { success: true, message: newUser.message, user: newUser.newUser }
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
      } else if (error instanceof mongoose.Error.ValidationError) {
        return { success: false, message: error, user: false }
      } else {
        console.error(error)
        return { success: false, message: error, user: false }
      }
    }
  }

  async loginUser({ email, password }) {
    try {
      const userLogin = await this.repo.login({ email, password })
      return userLogin
        ? { success: true, message: 'Successful Login', foundUser: userLogin }
        : { success: false, message: 'Invalid credentials' }
    } catch (error) {
      return { success: false, message: error, user: false }
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.repo.getByEmail(email)
      return user
        ? { success: true, user }
        : { success: false, message: 'User not found' }
    } catch (error) {
      return { success: false, message: error, user: false }
    }
  }

  async getUserById(id) {
    try {
      const user = await this.repo.getById(id)
      return user
        ? { success: true, user }
        : { success: false, message: 'User not found' }
    } catch (error) {
      return { success: false, message: error, user: false }
    }
  }

  async updatePassword(id, newPassword) {
    try {
      console.log(id, newPassword)
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      const user = await this.repo.updatePassword(id, hashedPassword)
      console.log(user)
      delete user.password
      return user
        ? { success: true, message: 'Password updated', user }
        : { success: false, message: 'Could not update password' }
    } catch (error) {
      return { success: false, message: error, user: false }
    }
  }

  async changeRole(uId, newRole) {
    try {
      const user = await this.repo.changeRole(uId, newRole)
      return user
        ? { success: true, message: 'Role updated', user }
        : { success: false, message: 'Could not update role' }
    } catch (error) {
      return { success: false, message: error, user: false }
    }
  }
}
