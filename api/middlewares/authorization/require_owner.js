const authorizeOwner = (req, res, next) => {
    if (!req.user.role || !req.user.role !== "owner"){
        return res.status(403).json({msg: 'Access denied, owner permission required'})
    }

    next()
}

module.exports = authorizeOwner