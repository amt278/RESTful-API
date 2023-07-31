const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
    'type': 'object',
    'properties': {
        'email': {
            'type': 'string',
            'pattern': '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
        },
        'password': {
            'type': 'string',
            'minLength': 3
        }
    },
    'required': ['email', 'password']
}

module.exports = ajv.compile(schema)