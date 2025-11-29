const { CustomAPIError } = require('./custom_error')

const AuthErrors = {
  WrongUsername: class extends CustomAPIError {
    constructor(message = 'Invalid username') {
      super(message, 401)
      this.name = 'WrongUsername'
    }
  },
  WrongPassword: class extends CustomAPIError {
    constructor(message = 'Invalid password') {
      super(message, 401)
      this.name = 'WrongPassword'
    }
  },
  Forbidden: class extends CustomAPIError {
    constructor(message = 'Forbidden') {
      super(message, 403)
      this.name = 'Forbidden'
    }
  }
}

module.exports = AuthErrors
