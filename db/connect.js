require('dotenv').config()
const mongoose = require('mongoose')

const connectLink = mongoose.connect(process.env.MONGO_URI)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB