const validator = require('../util/authValidator')

module.exports = (req, res, nxt) => {
    if (validator(req.body)) {
        nxt()
    }
    else {
        res.status(400).send('invalid user data')
    }
}