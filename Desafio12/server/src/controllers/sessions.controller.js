import repositories from '../repositories/index.js'
import UsersManager from '../services/db/users.service.db.js'

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

export default { signup, login, githubCallback, currentUser }
