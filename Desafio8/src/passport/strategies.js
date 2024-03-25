import UserManager from '../services/db/users.service.db.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const userManager = new UserManager()

const strategyOptions = {
  usernameField: 'email',
  passportField: 'password',
  passReqToCallback: true,
}

const signup = async (req, email, password, done) => {
  try {
    const data = await userManager.addUser(req.body)

    if (!data.success) {
      return done(null, data.user, { message: data.message, success: data.success })
    } else {
      return done(null, data.user, { message: data.message, success: data.success })
    }
  } catch (error) {
    return done(null, false)
  }
}

const login = async (req, email, password, done) => {
  try {
    const user = { email, password }
    const userLogin = await userManager.loginUser(user)
    console.log('login', userLogin)
    if (!userLogin.success) return done(null, false, { message: 'User not found' })

    return done(null, userLogin.foundUser)
  } catch (error) {}
}

const signupStrategy = new LocalStrategy(strategyOptions, signup)
const loginStrategy = new LocalStrategy(strategyOptions, login)

passport.use('signup', signupStrategy)
passport.use('login', loginStrategy)

passport.serializeUser((user, done) => {
  console.log('Serialized User')
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getUserById(id)
  done(null, user)
})
