import { Router } from 'express'
import UserManager from '../services/db/users.service.db.js'

const sessionsRouter = Router()
const userManager = new UserManager()

sessionsRouter.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body
  try {
    const newUser = await userManager.addUser({
      first_name,
      last_name,
      email,
      password,
      age,
      role: 'admin',
    })

    res.json(newUser)
  } catch (error) {
    console.log(error)
  }
})

sessionsRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userManager.getUser({ email, password })
    const { message, foundUser, success } = user
    if (success) {
      req.session.user = foundUser.first_name
      req.session.role = foundUser.role
      res.status(200).json({ message, foundUser })
    } else {
      res.status(400).json({ message })
    }
  } catch (error) {
    console.log(error)
  }
})

sessionsRouter.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err)
    res.status(200).send('logged out')
  })
})

export default sessionsRouter
