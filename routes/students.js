const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/studentsControllerDB')
const studentValidator = require('../middlewares/studentValidatorMW')
const auth = require('../middlewares/authMWPermission')

router.param('id', studentsController.validateId)

// get all students
router.get('/', studentsController.getAllStudents)

// send data to server via url parameters
router.get('/:id', studentsController.getStudentById)

// create student
router.post('/', studentValidator, auth, studentsController.createStudent)

// delete student
router.delete('/:id', auth, studentsController.deleteStudent)

// update student
router.put('/:id', studentsController.updateStudent)

module.exports = router