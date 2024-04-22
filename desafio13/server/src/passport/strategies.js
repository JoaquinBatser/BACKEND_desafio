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
    const userManagerResponse = await userManager.addUser(req.body)

    return done(null, userManagerResponse.user, {
        message: userManagerResponse.message,
        success: userManagerResponse.success,
      })
    
  } catch (error) {
    console.log(error)
    return done(error)
  }
}

const login = async (req, email, password, done) => {
  try {
    const user = { email, password }

    const userManagerResponse = await userManager.loginUser(user)

    return done(null, userManagerResponse.foundUser, { message: userManagerResponse.message, success:userManagerResponse.success })
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
