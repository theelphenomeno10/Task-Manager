const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const authHead = req.headers.authorization

    if (!authHead || !authHead.startsWith("Bearer ")) {
        return res.status(401).json({msg: 'No token provided'})
    }

    const token = authHead.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({msg: 'Invalid or expired token'})
    }
}

module.exports = authenticateJWT