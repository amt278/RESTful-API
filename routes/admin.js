const express = require('express')
const router = express.Router()
const user = require('../models/userModel')
const auth = require('../middlewares/authMWPermission')

router.put('/:id', auth, (req, res, next) => {
    user.findByIdAndUpdate({_id: req.params.id}, {isAdmin: true}).then((data) => {
        if (data)
            res.send(`admin added: ${data.name}`)
        else
            res.status(404).send('user not found')
    }).catch((err) => {
        console.log(`error setting an admin`)
        next(err)
    })
})

module.exports = router