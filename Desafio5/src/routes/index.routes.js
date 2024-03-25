import express from 'express'
import viewsRouter from './views.routes.js'
import productsRouter from './products.routes.js'
import chatRouter from './chat.routes.js'
import cartsRouter from './carts.routes.js'

const indexRouter = express.Router()

indexRouter.use('/', viewsRouter)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/carts', cartsRouter)
indexRouter.use('/api/chat', chatRouter)

export default indexRouter
