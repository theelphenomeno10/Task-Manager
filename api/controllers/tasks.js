const asyncWrapper = require('../middlewares/async.js')
const Task = require('../models/tasks.js')
const dayjs = require('dayjs')

const getAllTask = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({}).lean()

    if (!tasks.length) {
        return res.status(404).json({msg: 'No tasks available'})
    }

    const formattedTasks = tasks.map(t => ({    
        ...t,
        expiry_day: dayjs(t.expiry_date).format("DD/MM/YYYY"),
        expiry_time: dayjs(t.expiry_date).format("HH:mm:ss")
    }))

    return res.status(200).json({formattedTasks})
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

    const formattedTasks = tasks.map(t => ({    
        ...t,
        expiry_day: dayjs(t.expiry_date).format("DD:MM:YYYY"),
        expiry_time: dayjs(t.expiry_date).format("HH:mm:ss")
    }))

    return res.status(200).json({task: formattedTasks})
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