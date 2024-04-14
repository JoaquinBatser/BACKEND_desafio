import repositories from '../repositories/index.js'
import UsersManager from '../services/db/users.service.db.js'
import mailing from '../middlewares/mailing.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const usersManager = new UsersManager(repositories.users)

const signup = async (req, res) => {
  try {
    const id = req.session.passport.user
    const user = await usersManager.getUserById(id)
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
        user: user.user,
        session: req.session,
      })
    }
  } catch (error) {
    console.log(error.message)

    next(error.message)
  }
}

const login = async (req, res) => {
  try {
    const id = req.session.passport.user
    const userData = await usersManager.getUserById(id)
    const { password, ...data } = userData.user

    if (!userData.success) {
      res.json({
        message: 'User not found',
        success: userData.success,
        session: req.session,
      })
    } else {
      res.json({
        message: 'User logged in',
        user: userData.user,
        success: userData.success,
        session: req.session,
      })
    }
  } catch (error) {
    next(error.message)
  }
}

const githubCallback = async (req, res) => {
  req.session.user = req.user
  req.session.admin = true
  res.redirect('/products')
}

const currentUser = async (req, res) => {
  try {
    const id = req.session.passport.user
    const user = await usersManager.getUserById(id)

    if (!user.success) {
      res.json({
        success: false,
        message: 'Could not find user',
        session: req.session,
      })
    } else {
      res.json({
        success: true,
        message: 'User found',
        user: user,
        session: req.session,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const sendPasswordResetEmail = async (req, res, next) => {
  const { email } = req.params
  console.log(email)
  try {
    const userData = await usersManager.getByEmail(email)
    console.log(userData)
    if (!userData.success) {
      res.json({
        success: false,
        message: 'Could not find user',
        session: req.session,
      })
    }
    const token = jwt.sign({ isValid: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    await mailing.sendPassswordChangeEmail(email, token)

    res.status(200).json({
      success: true,
      message: 'Email sent',
    })
  } catch (error) {
    console.log(error)
  }
}
const updatePassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { id, newPassword } = req.body

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      res.status(401).json({ success: false, message: 'Invalid token' })
    }

    await usersManager.updatePassword(id, newPassword)

    res.status(200).json({ success: true, message: 'Password updated' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
export default {
  signup,
  login,
  githubCallback,
  currentUser,
  updatePassword,
  sendPasswordResetEmail,
}
