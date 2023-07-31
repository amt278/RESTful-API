const express = require('express')
const router = express.Router()
const userValidator = require('../middlewares/userValidatorMW')
const user = require('../models/userModel')
const bcrypt = require('bcrypt')
const authToken = require('../util/authToken')
const userController = require('../controllers/userController')

// registration
router.post('/', userValidator, userController.registration)

module.exports = router