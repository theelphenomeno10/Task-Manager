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

const authenticateJWT = require('../middlewares/authentication/authentication.js')

const queryBuilder = require('../middlewares/query/query.js')

router.use(authenticateJWT)
router.route('/').get(queryBuilder, getAllTask).post(createTask).delete(queryBuilder, deleteAllTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
