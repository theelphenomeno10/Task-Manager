const express = require('express')
const router = express.Router()

const {
    register,
    login,
    refresh,
    logout
} = require('../controllers/authentication.js')

const {
    registerValidator,
    loginValidator
} = require('../validators/authenticate.js')

const validateRequest = require('../middlewares/validator/validate_request.js')

router.route('/register').post(registerValidator, validateRequest, register)
router.route('/login').post(loginValidator, validateRequest, login)
router.route('/refresh').post(refresh)
router.route('/logout').post(logout)

module.exports = router