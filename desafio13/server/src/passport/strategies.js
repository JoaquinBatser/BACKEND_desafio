import UsersManager from '../services/db/users.service.db.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { loginValidator } from '../validation/loginValidator.js'
import { signupValidator } from '../validation/signupValidator.js'
import UsersRepository from '../repositories/users.repository.js'
import { userModel } from '../models/user.model.js'

const usersRepository = new UsersRepository(userModel)
const userManager = new UsersManager(usersRepository)

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

const signup = async (req, email, password, done) => {
  try {
    const signupValidation = signupValidator(req.body)
    const data = await userManager.addUser(req.body)

    if (signupValidation.success === false) {
      return done(null, false, { signupValidation })
    }
    if (!data.success) {
      return done(null, data.user, {
        message: data.message,
        success: data.success,
      })
    } else {
      return done(null, data.user, {
        message: data.message,
        success: data.success,
      })
    }
  } catch (error) {
    console.log(error)
    return done(error)
  }
}

const login = async (req, email, password, done) => {
  try {
    console.log('login', email, password)
    const user = { email, password }
    console.log(user)

    const userLogin = await userManager.loginUser(user)

    if (!userLogin.success) {
      return done(null, false, { message: userLogin.message })
    }

    return done(null, userLogin.foundUser, { message: userLogin.message })
  } catch (error) {
    console.log(error)
    return done(error)
  }
}

const signupStrategy = new LocalStrategy(strategyOptions, signup)
const loginStrategy = new LocalStrategy(strategyOptions, login)

passport.use('signup', signupStrategy)
passport.use('login', loginStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getUserById(id)
  done(null, user)
})
