const generateToken = require('../utils/generate_token')
const User = require('../models/users.js')
const asyncWrapper = require('../middlewares/async.js')

const register = asyncWrapper (async (req, res) => {
    const {username, password, email, role}  = req.body
    const user = await User.create({username, email, password, role})
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

    if (!user) {
        return res.status(401).json({msg: 'Invalid username'})
    }

    if (!(await user.comparePassword(password))) {
        return res.status(401).json({msg: 'Wrong password'})
    }

    const token = generateToken(user)

    res.status(200).json({msg: 'Login successful', token: token})
})

module.exports = {register, login}