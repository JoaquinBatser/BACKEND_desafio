import { Router } from 'express'
import { logger } from '../logger.js'

const loggerRouter = Router()

loggerRouter.get('/', (req, res) => {
  logger.error('Error processing request:')
})

export default loggerRouter
