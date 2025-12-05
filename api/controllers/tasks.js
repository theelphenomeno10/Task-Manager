const asyncWrapper = require('../middlewares/async.js')
const Task = require('../models/tasks.js')
const dayjs = require('dayjs')

const getAllTask = asyncWrapper(async (req, res, next) => {
    const filter = req.filter || {}
    const sort = req.sort || {}
    const {limit, page, skip} = req.pagination

    filter.user = req.user ? req.user.id : null

    const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit).lean()

    if (!tasks.length) {
        return res.status(200).json({msg: 'No tasks available'})
    }

    const formattedTasks = tasks.map(t => ({    
        ...t,
        expiry_day: dayjs(t.expiry_date).format("DD/MM/YYYY"),
        expiry_time: dayjs(t.expiry_date).format("HH:mm:ss")
    }))

    const total = await Task.countDocuments(filter)

    return res.status(200).json({total, page, limit, formattedTasks})
})

const createTask = asyncWrapper(async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({msg: 'No content provided'})
    }

    const userId = req.user ? req.user.id : null

    const now = new Date()
    const expiry = new Date(req.body.expiry_date)
    if (isNaN(expiry.getTime()) || expiry < now){
        return res.status(400).json({msg: 'Invalid expiry date'})
    }

    const task = await Task.create({ ...req.body, user: userId })
    return res.status(201).json({task})
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const filter = req.user ? { _id: taskID, user: req.user.id } : { _id: taskID, user: null }
    const task = await Task.findOne(filter);

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
    const filter = req.user ? { _id: taskID, user: req.user.id} : { _id: taskID, user: null}
    const task = await Task.findByIdAndUpdate(filter, req.body, {
        new: true,
        runValidators: true
    })

    if (req.body.expiry_date){
        const expire = new Date(req.body.expiry_date)
        const now = new Date()

        if (isNaN(expiry.getTime()) || expire < now){
            return res.status(400).json({msg: 'Invalid time'})
        }
    }

    if (!task) {
        return res.status(404).json({msg: 'Task not found'})
    }

    return res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const filter = req.user ? { _id: taskID, user: req.user.id } : { _id: taskID, user: null }
    const task = await Task.findByIdAndDelete(filter)

    if (!task) {
        return res.status(404).json({msg: 'Task not found'})
    }

    return res.status(204).json({task})
})

const deleteAllTask = asyncWrapper(async (req, res, next) => {
    const filter = { ...req.filter }

    filter.user = req.user ? req.user.id : null

    const task = await Task.deleteMany(filter)

    const userLabel = req.user ? req.user.username : "guest"
    return res.status(200).json({msg: `Deleted all tasks from ${userLabel}`})
})

module.exports = {getAllTask, createTask, getTask, updateTask, deleteTask, deleteAllTask}