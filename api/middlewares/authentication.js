const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const authHead = req.headers.authorization

    const token = authHead.split(" ")[1]

    if (!token){
        req.user = null
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({msg: 'Invalid or expired token'})
    }
}

module.exports = authenticateJWT