import { createHash, isValidPassword } from '../utils.js'
export default class UsersRepository {
  constructor(model) {
    this.userModel = model
  }

  async add(user) {
    let newUser
    const { email, password } = user

    const userExists = await this.userModel.findOne({ email })

    if (userExists) {
      return { message: 'User already exists', success: false }
    }

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      newUser = await this.userModel.create({
        ...user,
        password: createHash(password),
        role: 'admin',
      })
      return { newUser, message: 'User created', success: true }
    } else {
      newUser = await this.userModel.create({
        ...user,
        password: createHash(password),
        role: 'user',
      })
      return { newUser, message: 'User created', success: true }
    }
  }

  async login({ email, password }) {
    const user = await this.userModel.findOne({ email })

    if (!user) {
      return { message: 'User does not exist', success: false }
    }
    const isValid = isValidPassword(user, password)

    if (!isValid) {
      return { message: 'Invalid credentials', success:false}
    }
    
    return { success:true,message:'User logged in', user}
  }
  async isValid(user, password) {
    return isValidPassword(user, password)
  }

  async getByEmail(email) {
    return await this.userModel.findOne({ email })
  }

  async getById(id) {
    return await this.userModel.findById(id)
  }
  async updatePassword(id, newPassword) {
    return await this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { password: newPassword } },
        { new: true }
      )
      .lean()
  }
  async changeRole(id, newRole) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { role: newRole } },
      { new: true }
    )
  }
}
