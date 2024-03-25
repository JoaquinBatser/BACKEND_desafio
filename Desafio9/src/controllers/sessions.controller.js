import UserManager from '../services/db/users.service.db.js'
const userManager = new UserManager()

const signup = async (req, res) => {
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
}

const login = async (req, res) => {
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
}

const githubCallback = async (req, res) => {
  req.session.user = req.user
  req.session.admin = true
  res.redirect('/products')
}

const currentUser = async (req, res) => {
  try {
    const id = req.session.passport.user
    const user = await userManager.getUserById(id)

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
