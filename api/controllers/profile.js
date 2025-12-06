const authenticateMiddleware = require('../middlewares/authentication/authentication.js')
const asyncWrapper = require('../middlewares/wrappers/async.js')
const User = require('../models/users.js')
const Task = require('../models/tasks.js')

const getUser = asyncWrapper(async(authenticateMiddleware, req, res) => {
    const userId = req.user.id

    const user = User.findById(userId).select("-password")

    const task = Task.find
})