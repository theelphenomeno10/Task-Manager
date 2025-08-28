const {CustomAPIError} = require('../errors/custom_error.js')
const logger = require('../utils/logger.js')

const errorHandling = (err, req, res, next) => {
    logger.error(err.stack || err)

    if (err instanceof CustomAPIError) {
        if (process.env.NODE_ENV === 'development') {
            return res.status(err.statusCode).json({stack: err.stack})
        }

        return res.status(err.statusCode).json({msg: err.message})
    }

    console.error(err.stack || err)

    if (process.env.NODE_ENV === 'development') {
        return res.status(500).json({msg: err.message, stack: err.stack})
    }

    return res.status(500).json({msg: 'Server is having some undocumented issues, please kindly wait'})
}

module.exports = {CustomAPIError, errorHandling}