const jwt = require('jsonwebtoken')

const AuthorizeJWT = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({msg: 'Access denied, unathorized resources'})
        }
        next()
    }
}

module.exports = AuthorizeJWT