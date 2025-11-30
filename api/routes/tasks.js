const express = require('express')
const router = express.Router()
const {
    getAllTask, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask,
    deleteAllTask
} = require('../controllers/tasks')
const authenticateJWT = require('../middlewares/authentication.js')

router.use(authenticateJWT)
router.route('/').get(getAllTask).post(createTask).delete(deleteAllTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
