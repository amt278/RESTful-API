const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (v) => {
    let token = undefined
    if(config.get('jwtsec')) {
        token = jwt.sign({id: v._id, admin: v.isAdmin}, config.get('jwtsec'))
    }
    else {
        // token = jwt.sign({id: this._id, adminRole: this.isAdmin}, 'sec')
        console.log('env token error')
    }
    return token
}