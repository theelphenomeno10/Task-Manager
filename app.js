const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const {errorHandling} = require('./middlewares/error_handling.js')

app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.use(errorHandling);

module.exports = app