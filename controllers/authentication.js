const generateToken = require('../utils/generate_token')
const User = require('../models/users.js')
const asyncWrapper = require('../middlewares/async.js')

const register = asyncWrapper (async (req, res) => {
    const {username, password, email, role} = req.body
    let assignedRole = "user"

    if (req.user && req.user.role === "admin" && role) {
        assignedRole = role
    }

    const user = await User.create({username, email, password, assignedRole})
    const token = generateToken(user)

    res.status(201).json({
        msg: 'User registered successfully',
        user: {username, email},
        token: token
    })
})

const login = asyncWrapper (async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})

    if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({msg: "Invalid username or password"})
    }

    const token = generateToken(user)

    res.status(200).json({msg: 'Login successful', user: {username, email}, token: token})
})

module.exports = {register, login}