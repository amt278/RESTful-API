const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
    'type': 'object',
    'properties': {
        'name': {
            'type': 'string',
            'pattern': '^[A-Z][a-z]'
        },
        'email': {
            'type': 'string',
            'pattern': '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
        },
        // 'isAdmin': {
        //     'type': 'boolean'
        // },
        'password': {
            'type': 'string',
            'minLength': 3
        }
    },
    'required': ['name', 'email', 'password']
}

module.exports = ajv.compile(schema)