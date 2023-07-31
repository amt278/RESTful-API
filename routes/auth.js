const express = require('express')
const router = express.Router()
const validator = require('../middlewares/authValidatorMW')
const authController = require('../controllers/authController')

router.post('/', validator, authController.login)

module.exports = router