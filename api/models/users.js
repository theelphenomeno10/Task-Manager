const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
        match: [/^\S+@\S+\.\S+$/, 'Must have a valid email']
    },

    password: {
        type: String,
        required: [true, 'Must have a password'],
        trim: true,
        minlength: 6,
        select: false
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'owner'],
        default: 'user'
    }
})

User_Schema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

User_Schema.methods.comparePassword = async function (providedPassword) {
    return bcrypt.compare(providedPassword, this.password)
}

module.exports = mongoose.model('User', User_Schema)