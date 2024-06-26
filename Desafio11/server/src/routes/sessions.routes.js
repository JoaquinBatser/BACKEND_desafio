import { Router } from 'express'
import sessionsController from '../controllers/sessions.controller.js'
import passport from 'passport'

const sessionsRouter = Router()

sessionsRouter.post(
  '/signup',
  passport.authenticate('signup'),
  sessionsController.signup
)

sessionsRouter.post(
  '/login',
  passport.authenticate('login'),
  sessionsController.login
)

sessionsRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  async (req, res) => {}
)

sessionsRouter.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  sessionsController.githubCallback
)

sessionsRouter.get('/current', sessionsController.currentUser)

export default sessionsRouter
