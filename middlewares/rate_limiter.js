const {RateLimiterRedis} = require('rate-limiter-flexible')
const Redis = require('ioredis')
const asyncWrapper = require('./async.js')
const logger = require('../utils/logger.js')

const clientRedis = new Redis({
    enableOfflineQueue: false
})

const rate_limiter = new RateLimiterRedis({
    storeClient: clientRedis,
    keyPrefix: 'middleware',
    points: 10,
    duration: 1
})

const rateLimiterMiddleware = asyncWrapper(async (req, res, next) => {
    try {
        await rate_limiter.consume(req.ip)
        next()
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Redis error ${error.message}`, {stack: error.stack})
            return next()
        }

        return res.status(429).json({msg: "Too many requests"})
    }
})

module.exports = rateLimiterMiddleware
