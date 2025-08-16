class CustomAPIError extends Error {
    constructor(message, error_code) {
        super(message)
        this.error_code = error_code
    }
}

const createError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode)
}

module.exports = {createError, CustomAPIError}