const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, nxt) => {
    // check role
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('access denied...')
    try {
        const decodedPayload = jwt.verify(token, config.get('jwtsec'))
        if (!decodedPayload.admin) return res.status(401).send('access denied...')
        nxt()
    } catch (err) {
        return res.status(400).send('token error...')
    }
}