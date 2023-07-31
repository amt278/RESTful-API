const studentModel = require('../models/studentsModelDB')

// create student
let createStudent = (req, res, next) => {
    let std = new studentModel({name: req.body.name, id: req.body.id})
    std.save().then(() => {
        console.log(`added student: ${std}`)
        res.status(200).send(std)
    }).catch((err) => {
        // for (let e in err.errors) {
        //     console.log(err.errors[e].message)
        // }
        // res.status(400).send('error while saving')
        console.log(`error while saving`)
        next(err)
    })
}

// get student
let getStudentById = (req, res, next) => {
    studentModel.findById(req.params.id).then((student) => {
        console.log('std found')
        res.status(200).send(student)
    }).catch((err) => {
        // for (let e in err.errors) {
        //     console.log(err.errors[e].message)
        // }
        // res.status(404).send('student not found')
        console.log(`error getting student by id`)
        next(err)
    })
}

// get all students
let getAllStudents = (req, res, next) => {
    studentModel.find().then((students) => {
        res.send(students)
    }).catch((err) => {
        // for (let e in err.errors) {
        //     console.log(err.errors[e].message)
        // }
        // res.status(400).send('error getting all std')
        console.log(`error getting all std`)
        next(err)
    })
}

// update student
let updateStudent = (req, res) => {
    studentModel.findOneAndUpdate({_id: req.params.id}, req.body, {
        returnOriginal: false // to return the updated doc instead of the deleted
    }).then((std) => {
        res.send(std)
    }).catch((err) => {
        // for (let e in err.errors) {
        //     console.log(err.errors[e].message)
        // }
        // res.status(404).send('update error! student not found')
        console.log(`update error! student not found`)
        next(err)
    })
}

// delete student
let deleteStudent = (req, res, next) => {
    studentModel.findByIdAndRemove(req.params.id).then((std) => {
        res.send(std)
    }).catch((err) => {
        // for (let e in err.errors) {
        //     console.log(err.errors[e].message)
        // }
        // res.status(404).send('delete error! student not found')
        console.log(`delete error! student not found`)
        next(err)
    })
}

let validateId = (req, res, next, val) => {
    if (/^[0-9a-fA-F]{24}$/.test(val)) {
        next()
    }
    else {
        res.status(400).send('invalid ID param')
    }
}

module.exports = {deleteStudent, updateStudent, getAllStudents, getStudentById, createStudent, validateId}