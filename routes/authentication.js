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

router.route('/register').post()