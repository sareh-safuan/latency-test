const dbo = require('../utils/dbo')

const requestUser = (key) => {
    return async (req, res, next) => {
        const startDB = Date.now()
        const users = await dbo.connection
            .collection('user')
            .find({})
            .toArray()

        res.locals[key] = Date.now() - startDB
        next()
    }
}

module.exports = requestUser