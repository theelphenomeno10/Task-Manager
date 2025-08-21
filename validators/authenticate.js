const {body} = require('express-validator')

const registerValidator = [
    body("username").notEmpty().withMessage("Must have a username"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Must have a password")  
        .isLength({min: 6}).withMessage("Password must have more than 6 characters"),
    body("role").optional().toLowerCase()
]

const loginValidator = [
    body("username").notEmpty().withMessage("Must have a username"),
    body("password").notEmpty().withMessage("Must have a password")
        .isLength({min: 6}).withMessage("Password must have more than 6 characters")
]

module.exports = {registerValidator, loginValidator}

