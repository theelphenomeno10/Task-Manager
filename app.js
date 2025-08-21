const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const {errorHandling} = require('./middlewares/error_handling.js')
const authRouter = require('./routes/authentication.js')

app.use(express.json())

app.use('/', authRouter)
app.use('/api/v1/tasks', tasks)

app.use(errorHandling);

module.exports = app