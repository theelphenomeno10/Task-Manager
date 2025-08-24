const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    const access_token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role
        },
        process.env.ACCESS_KEY,
        {
            expiresIn: "15m"
        }
    )

    const refresh_token = jwt.sign(
        {
            id: user._id
        },
        process.env.REFRESH_KEY,
        {
            expiresIn: "7d"
        }
    )

    return {access_token, refresh_token}
}

module.exports = generateToken