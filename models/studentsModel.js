const fs = require('fs')
const path = require('path')
const studentPath = path.join(path.dirname(process.mainModule.filename), 'data', 'students.json')

module.exports = class Student {
    constructor(name) {
        this.name = name
    }

    saveStudent(callback) {
        // students.push(this)
        // 1. read file
        fs.readFile(studentPath, (err, info) => {
            let students = []
            if (!err) {
                students = JSON.parse(info)
                // 2. edit data
                this.id = students.length + 1
                students.push(this)
                // 3. save to file
                fs.writeFile(studentPath, JSON.stringify(students), (err) => {console.log(`error in saving data! ${err}`)})
                callback(this)
            }
        })
    }

    static fetchAllStudents(callback) {
        fs.readFile(studentPath, (err, info) => {
            if (!err) {
                callback(JSON.parse(info))
            }
            else {
                callback([])
            }
        })
        // return students
    }

    static getStudent(id, callback) {
        fs.readFile(studentPath, (err, info) => {
            if (!err) {
                var students = JSON.parse(info)
                var idx = students.findIndex((val) => {return val.id == id})
                if (idx != -1)
                    callback(students[idx])
                else
                    callback()
            }
            else {
                callback()
            }
        })
    }

    static deleteStudent(id, callback) {
        fs.readFile(studentPath, (err, info) => {
            if (!err) {
                var students = JSON.parse(info)
                var idx = students.findIndex((val) => {return val.id == id})
                if (idx != -1){
                    var del = students.splice(idx, 1)
                    fs.writeFile(studentPath, JSON.stringify(students), (err) => {console.log(`error delete: ${err}`)})
                    callback(del)
                }
                else {
                    console.log('student not found')
                    callback()
                }
            }
        })
    }

    static updateStudent(std, id, callback) {
        fs.readFile(studentPath, (err, info) => {
            if (!err) {
                var students = JSON.parse(info)
                const updatedIdx = students.findIndex((val) => {return val.id == id})
                if (updatedIdx != -1) {
                    for (let i in std) {
                        students[updatedIdx][i] = std[i]
                    }
                    fs.writeFile(studentPath, JSON.stringify(students), (err) => {console.log(`error update! ${err}`)})
                    callback(students[updatedIdx])
                }
                else {
                    console.log('student not found')
                    callback()
                }
            }
            else {
                console.log(`error update! ${err}`)
            }
        })
    }
}