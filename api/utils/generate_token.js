const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1h"
        }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "7d"
        }
    )
}

module.exports = {generateAccessToken, generateRefreshToken}