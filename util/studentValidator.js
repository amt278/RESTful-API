const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
    'type': 'object',
    'properties': {
        'name': {
            'type': 'string',
            'pattern': '^[A-Z][a-z]'
        },
        'id': {
            'type': 'number'
        },
    },
    'required': ['name']
}

module.exports = ajv.compile(schema)