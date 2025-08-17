const express = require('express')
const router = express.Router()
const {
    getAllTask, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
} = require('../controller/tasks.js')

router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)

module.exports = router
