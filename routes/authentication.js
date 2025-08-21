const express = require('express')
const router = express.Router()

const {
    register,
    login
} = require('../controllers/authetication.js')

const {
    registerValidator,
    loginValidator
} = require('../validators/authenticate.js')

const validateRequest = require('../middlewares/validateRequest.js')

router.route('/register').post(registerValidator, validateRequest, register)
router.route('/login').post(loginValidator, validateRequest, login)

module.exports = router