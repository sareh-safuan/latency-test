const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config')

const signToken = (key) => {
    return (req, res, next) => {
        const start = Date.now()
        jwt.sign({ id: '507f1f77bcf86cd799439011' }, JWT_KEY, (err, token) => {

            res.locals[key] = Date.now() - start
            next()
        })
    }
}

module.exports = signToken