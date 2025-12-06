const express = require('express')
const router = express.Router()

const {
    getAllUser
} = require('../controllers/admin.js')

const authorizeJWT = require('../middlewares/authorization/authorize_role.js')
const queryBuilder = require('../middlewares/query/query.js')
const requireLogin = require('../middlewares/authentication/require_login.js')
const authenticateJWT = require('../middlewares/authentication/authentication.js')

router.use(authenticateJWT)
router.use(requireLogin)
router.use(authorizeJWT("admin"))

router.route('/').get(queryBuilder, getAllUser)

module.exports = router