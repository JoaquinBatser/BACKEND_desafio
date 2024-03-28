import winston from 'winston'
import dotenv from 'dotenv'

dotenv.config()

const MODE = process.env.MODE
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'orange',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white',
  },
}

winston.addColors(customLevels.colors)

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
})

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './errors.log' }),
  ],
})

export const logger = MODE === 'DEV' ? devLogger : prodLogger
