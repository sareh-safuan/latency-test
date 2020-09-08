const bcrypt = require('bcrypt')

const compareHash = (key) => {
    return async (req, res, next) => {
        const start = Date.now()
        const password = 'njfpDHWYD7vfmky8'
        const hash = '$2b$10$GBHP424Agn03MPFszEF09u4aewYS0ZkgqJMnHntW6UY893SYYM3Fa'
        const match = await bcrypt.compare(password, hash)
        
        res.locals[key] = Date.now() - start
        next()
    }
}

module.exports = compareHash