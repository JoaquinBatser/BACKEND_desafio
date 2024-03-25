import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

//

import bcrypt, { hashSync, genSaltSync, compareSync } from 'bcrypt'

// register
export const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

//login
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}
