const authorizeRole = (req, res, next) => {
    if (!req.user || !req.user.role){
        return res.status(403).json({msg: 'Access denied, log in to continue'})
    }

    next()
}

module.exports = authorizeRole