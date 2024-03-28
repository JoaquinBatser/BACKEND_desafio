import { createHash, isValidPassword } from '../utils.js'
export default class UsersRepository {
  constructor(model) {
    this.userModel = model
  }

  async add(user) {
    console.log('repository')
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
      console.log('newUser', newUser)
      return { newUser, message: 'User created', success: true }
    }
  }

  async login({ email, password }) {
    console.log('repo', 'email', email, 'password', password)
    const user = await this.userModel.findOne({ email })

    if (!user) {
      return { 'User does not exist': false }
    }
    console.log('repo', 'user', user)
    const isValid = isValidPassword(user, password)
    console.log('repo', 'isValid', isValid)
    // return true ? user && isValid : false
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
