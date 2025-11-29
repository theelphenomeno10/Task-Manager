require('dotenv').config()
const connectDB = require('./db/connect.js')
const port = process.env.PORT || 3000
const app = require('./app.js')
const asyncWrapper= require('./middlewares/async.js')

const start = asyncWrapper(async () => {
    await connectDB()
    app.listen(port)
})

start()