const mongoose = require('mongoose')

const schema = {
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 2,
    },
    id: {
        type: Number,
        unique: true,
        // validate: {validator: (v) => !Student.find({id: v}).count()},
        required: true
    }
}

const Student = mongoose.model('students', schema)

module.exports = Student