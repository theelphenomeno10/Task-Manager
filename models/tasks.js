const mongoose = require('mongoose')

const Tasks_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Must provide task's name`],
        trim: true
    },

    expiry_date: {
        type: Date,
        default: Date.now
    },

    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', Tasks_Schema)