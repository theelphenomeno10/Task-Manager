const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    console.log("AUTHORIZATION HEADER:", req.headers.authorization)
    const authHead = req.headers.authorization

    if (!authHead){
        req.user = null
        return next()
    }

    const parts = authHead.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer"){
        req.user = null
        return next()
    }

    const token = parts[1]

    if (!token){
        req.user = null
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        console.log(req.user.role)
        next()
    } catch (error) {
        return res.status(403).json({msg: 'Invalid or expired token'})
    }
}

module.exports = authenticateJWT