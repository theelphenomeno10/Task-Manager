const asyncWrapper = async (fn) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncWrapper