const user = require('../models/userModel')
const bcrypt = require('bcrypt')
const authToken = require('../util/authToken')

const registration = (req, res) => {
    // check if user already exist
    user.findOne({email: req.body.email}).then(async (val) => {
        if (val) {
            res.status(400).json({message: 'User already exist'})
        }
        else {
            let salt = await bcrypt.genSalt(10) // 10 is the default value 
            let hashedPass = await bcrypt.hash(req.body.password, salt)
            const newUser = new user({name: req.body.name, email: req.body.email, password: hashedPass})
            newUser.save().then(() => {
                console.log(`added user: ${newUser}`)
                token = authToken(newUser)
                console.log(`token: ${token}`)
                res.header('x-auth-token', token)
                res.status(200).send(newUser)
            }).catch((err) => {
                console.log('error while saving')
                next(err)
            })
        }
    })
}

module.exports = {registration}