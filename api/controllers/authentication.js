const {generateAccessToken, generateRefreshToken} = require('../utils/generate_token.js')
const User = require('../models/users.js')
const asyncWrapper = require('../middlewares/wrappers/async.js')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger.js')

const register = asyncWrapper (async (req, res, next) => {
    const {username, password, email, role} = req.body
    let assignedRole = "user"

    if (req.user && req.user.role === "admin" && role) {
        assignedRole = role
    }

    const user = await User.create({username, email, password, assignedRole})
    const access_token = generateAccessToken(user)
    const refresh_token = generateRefreshToken(user)

    res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    res.status(201).json({
        msg: 'User registered successfully',
        user: {username, email},
        acess_token: access_token,
    })
})

const login = asyncWrapper (async (req, res, next) => {
    const {username, password, email} = req.body
    const user = await User.findOne({username}).select("+password")

    if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ msg: "Invalid credentials" })
    }

    const access_token = generateAccessToken(user)
    const refresh_token = generateRefreshToken(user)

    res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    res.status(200).json({msg: 'Login successful',
        user: {username, email},
        access_token: access_token,
    })
})

const refresh = asyncWrapper(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ msg: 'Expired refresh token, please login again' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(403).json({ msg: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user);
        const { username, email } = user;

        return res.status(200).json({
            user: { username, email },
            access_token: newAccessToken
        })
    } catch (error) {
        logger.error(`Refresh token error: ${error.stack}`);
        return res.status(403).json({ msg: 'Refresh token error' });
    }
})

const logout = asyncWrapper(async (req, res, next) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })

        return res.status(200).json({msg: "Logout successfully"})
    } catch (error) {
        logger.error(`Logout error: ${error.stack}`)
        return res.status(500).json({msg: "Logout failed"})
    }
})

module.exports = {register, login, refresh, logout}