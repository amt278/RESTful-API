const user = require('../models/userModel')
const bcrypt = require('bcrypt')
const authToken = require('../util/authToken')

const login = (req, res, next) => {
    // check email
    user.findOne({email: req.body.email}).then((val) => {
        if (val) {
            bcrypt.compare(req.body.password, val.password, (err, valid) => {
                if (err) {
                    console.log(err)
                    return res.status(403).send('error while login')
                }
                // check pass
                if (valid) {
                    const token = authToken(val)
                    console.log(`token: ${token}`)
                    res.header('x-auth-token', token) // the name began with x because its a custom key(not oblig. but preferable)
                    res.send('login successfully')
                }
                else {
                    res.status(400).send('invalid email or password')
                }
            })
        }
        else {
            res.status(400).send('invalid email or password')
        }
    }).catch((err) => {
        console.log('error while login')
        next(err)
    })
}

module.exports = {login}