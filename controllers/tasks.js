const asyncWrapper = require('../middlewares/async.js')
const Task = require('../models/tasks.js')
const {createError} = require('../errors/custom_error.js')

const getAllTask = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({})

    if (!tasks.length) {
        return res.status(404).json({msg: 'No tasks available'})
    }

    return res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({msg: 'No content provided'})
    }

    const task = await Task.create(req.body)
    return res.status(201).json({task})
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findById(taskID)

    if (!task) {
        return res.status(404).json({msg: 'Task not found'})
    }

    return res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return res.status(404).json({msg: 'Task not found'})
    }

    return res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findByIdAndDelete(taskID)

    if (!task) {
        return res.status(404).json({msg: 'Task not found'})
    }

    return res.status(204).json({task})
})

module.exports = {getAllTask, createTask, getTask, updateTask, deleteTask}