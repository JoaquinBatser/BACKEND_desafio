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
      return { 'User does not exist': false }
    }
    const isValid = isValidPassword(user, password)
    return user
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
}
