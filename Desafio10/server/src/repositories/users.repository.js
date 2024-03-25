import { createHash, isValidPassword } from '../utils.js'
export default class UsersRepository {
  constructor(model) {
    this.userModel = model
  }

  async add(user) {
    console.log('repository')
    let newUser
    const { email, password } = user

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      newUser = await userModel.create({
        ...user,
        password: createHash(password),
        role: 'admin',
      })
    } else {
      newUser = await userModel.create({
        ...user,
        password: createHash(password),
        role: 'user',
      })
    }
    return newUser
  }

  async login({ email, password }) {
    console.log('repo', email, password)
    const user = await this.userModel.findOne({ email })
    console.log('repo', user)
    const isValid = isValidPassword(user, password)
    console.log('repo', isValid)
    // return true ? user && isValid : false
    return { email, password }
  }
  async isValid(user, password) {
    return isValidPassword(user, password)
  }

  async getByEmail(email) {
    return await userModel.findOne({ email })
  }

  async getById(id) {
    return await userModel.findById(id)
  }
}
