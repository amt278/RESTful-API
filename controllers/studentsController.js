const validator = require('../util/studentValidator')
const Student = require('../models/studentsModel')

const getAllStudents = (req, res) => {
    // res.set("Access-Control-Allow-Origin", "*")
    // res.json(students)
    Student.fetchAllStudents((obj) => {
        res.render('students.ejs', {std: obj})
    })
}

const getStudentById = (req, res) => {
    var id = req.params.id
    // var student = students.find((val, idx, arr) => {return val.id==id})

    // if (student)
    //     res.json(student)
    // else
    //     res.status(404).send('student not found')
    Student.getStudent(id, (std) => {
        if (std)
            res.json(std)
        else
            res.status(404).send('student not found')
    })
}

const createStudent = (req, res) => {
    var valid = validator(req.body)
    if (valid) {
        let std = new Student(req.body.name)
        std.saveStudent((val) => {
            res.send(`name: ${val.name}, id: ${val.id}`)
        })
    }
    else {
        res.status(403).send('error! unknown format')
    }
}

const deleteStudent = (req, res) => {
    // var idx = students.findIndex((val) => {return val.id == req.params.id})
    
    // if (idx != -1) {
    //     var deletedStudent = students.splice(idx, 1)
    //     res.send(JSON.stringify(deletedStudent))
    // }
    // else
    //     res.status(403).send('student not found')
    Student.deleteStudent(req.params.id, (deletedStudent) => {
        if (typeof deleteStudent !== 'undefined') {
            res.send(JSON.stringify(deletedStudent))
        }
        else {
            res.status(403).send('student not found')   
        }
    })
}

const updateStudent = (req, res) => {
    // const updatedIdx = students.findIndex((val) => {return val.id == req.params.id})

    // if (updatedIdx != -1) {
    //     // students[updatedIdx].name = req.query.name
    //     for (i in req.body) {
    //         students[updatedIdx][i] = req.body[i]
    //     }
    //     res.send(students)
    // }
    // else
    //     res.status(403).send('student not found')
    var valid = validator(req.body)
    if (valid) {
        Student.updateStudent(req.body, req.params.id, (val) => {
            if (typeof updateStudent !== 'undefined') {
                res.send(val)
            }
            else {
                res.status(404).send('student not found')
            }
        })
    }
    else {
        res.status(403).send('unvalid name')
    }
}

const validateId = (req, res, next, val) => {
    // validation of param
    if (Number(val)) {
        // add param as prop of req
        req.id = val
    
        next()
    }
    else {
        res.status(400).send('invalid id')
    }

}

module.exports = {getAllStudents, getStudentById, createStudent, deleteStudent, updateStudent, validateId}