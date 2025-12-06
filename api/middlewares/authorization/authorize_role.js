const authorizeJWT = (...roles) => {
    return (req, res, next) => {
        if (!req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({msg: 'Access denied, unathorized resources'})
        }

        next()
    }
}

module.exports = authorizeJWT