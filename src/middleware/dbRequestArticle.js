const dbo = require('../utils/dbo')

const requestArticle = (key) => {
    return async (req, res, next) => {
        const startDB = Date.now()
        const article = await dbo.connection
            .collection('articles')
            .find({})
            .toArray()

        res.locals[key] = Date.now() - startDB
        next()
    }
}

module.exports = requestArticle