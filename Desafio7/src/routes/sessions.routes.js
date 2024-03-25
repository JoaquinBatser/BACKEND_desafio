import { Router } from 'express'
import UserManager from '../services/db/users.service.db.js'
import passport from 'passport'

const sessionsRouter = Router()
const userManager = new UserManager()

sessionsRouter.post('/signup', passport.authenticate('signup'), async (req, res) => {
  try {
    const id = req.session.passport.user
    const user = await userManager.getUserById(id)

    if (!user.success) {
      res.json({
        success: false,
        message: 'User already exists',
        session: req.session,
      })
    } else {
      res.json({
        success: true,
        message: 'User created',
        session: req.session,
      })
    }
  } catch (error) {
    next(error.message)
  }
})

sessionsRouter.post('/login', passport.authenticate('login'), async (req, res) => {
  try {
    const id = req.session.passport.user
    const userData = await userManager.getUserById(id)
    console.log('data', userData)
    const { password, ...data } = userData.user

    if (!userData.success) {
      res.json({
        message: 'User not found',
        success: userData.success,
      })
    } else {
      res.json({
        message: 'User logged in',
        user: userData.user,
        success: userData.success,
      })
    }
  } catch (error) {
    next(error.message)
  }
})

sessionsRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  async (req, res) => {}
)

sessionsRouter.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.user = req.user
    req.session.admin = true
    res.redirect('/products')
  }
)

export default sessionsRouter
