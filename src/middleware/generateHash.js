const bcrypt = require('bcrypt')

const generateHash = (key) => {
    const password = 'njfpDHWYD7vfmky8'
    const salt = 10
    return async (req, res, next) => {
        const startHash = Date.now() 
        const hash =  await bcrypt.hash(password, salt)

        res.locals[key] = Date.now() - startHash
        next()
    }
}

module.exports = generateHash