const mongoose = require('mongoose')
const valid = require('validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const schema = mongoose.Schema({
    name: {
        type: String,
        required :true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (val) => valid.isEmail(val),
            message: '{VALUE} is not valid email'
        }
    },
    isAdmin: {
        type: Boolean
    },
    password: {
        type: String,
        minLength: 3,
        required: true
    }
})

// schema.method("getAuthToken", (v) => {
//     if(config.get('jwtsec')) {
//         const token = jwt.sign({id: v._id, adminRole: v.isAdmin}, config.get('jwtsec'))
//         return token
//         // jwt.sign({id: this._id, adminRole: this.isAdmin}, config.get('jwtsec'), (err, token) => {
//         //     if (!err)
//         //         callback(token)
//         // })
//     }
//     else {
//         jwt.sign({id: this._id, adminRole: this.isAdmin}, 'sec', (err, token) => {
//             if (!err)
//                 callback(token)
//         })
//         console.log('token error')
//     }
// })

module.exports = mongoose.model('users', schema)