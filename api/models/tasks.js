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

    status: {
        type: String,
        enum: ["pending", "in-progress", "done", "overdue"],
        default: "pending"
    },

    user: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Task', Tasks_Schema)