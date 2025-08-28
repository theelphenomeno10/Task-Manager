class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.name = "Custom API Error"
    }
}

const createError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode)
}

module.exports = {createError, CustomAPIError} 