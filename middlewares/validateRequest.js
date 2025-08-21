const {validateResult} = require('express-validator')

const validateRequest = async (req, res, next) => {
    const errors = validateResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                msg: err.msg
            }))
        })
    }

    next()
}

module.exports = validateRequest