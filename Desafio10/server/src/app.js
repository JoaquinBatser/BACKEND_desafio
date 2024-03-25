import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import './passport/strategies.js'
import initializePassport from './config/passport.config.js'

import { __dirname } from './utils.js'
import indexRouter from './routes/index.routes.js'
import passport from 'passport'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const DB_URL =
  process.env.DB_URL || 'mongodb://localhost:27017/PracticaIntegradora'
const COOKIESECRET = process.env.SECRET

app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
  })
)

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT} 🏃 `)
})

const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST', 'DELETE'],
  },
})

io.on('connection', (socket) => {
  console.log('New client connected')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

app.use(
  session({
    secret: COOKIESECRET,
    resave: false,
    saveUninitialized: true,
  })
)

initializePassport()

app.use(passport.initialize())

const environment = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log('DataBase Connected')
  } catch (error) {
    console.log(error)
  }
}
environment()

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/', indexRouter)
