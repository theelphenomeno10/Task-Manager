const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const {errorHandling} = require('./middlewares/errors/error_handling.js')
const authRouter = require('./routes/authentication.js')
const morganMiddleware = require('./middlewares/logging/morgan.js')
const helmet = require('helmet')
const cors = require('cors')
// const rateLimiterMiddleware = require('./middlewares/rate_limiter.js')
const cookieParser = require('cookie-parser')

app.use(helmet())
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"]
}))
// app.use(rateLimiterMiddleware)

app.use(morganMiddleware)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', authRouter)
app.use('/api/v1/tasks', tasks)

app.use(errorHandling);

module.exports = app