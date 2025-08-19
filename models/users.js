const mongoose = require('mongoose')

const User_Schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must have a username'],
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Must have an email'],
        trim: true,
        unique: true,
        match: [/^S+@\S+\.\S+$/, 'Must have a valid email']
    },

    password: {
        type: String,
        required: [true, 'Must have a password'],
        trim: true,
        minlength: 6,
        select: false
    }
})

module.exports = mongoose.model('User', User_Schema)