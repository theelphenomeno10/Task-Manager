require('dotenv').config()
const connectDB = require('./db/connect.js')
const port = process.env.PORT || 3000
const app = require('./app.js')

const start = async () => {
    try {
        await connectDB()
        app.listen(port)
    } catch (error) {
        console.error('Server booting failed: ', error)
    }
}

start()