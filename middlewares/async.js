const asyncWrapper = async (fn) => {
    return async () => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper