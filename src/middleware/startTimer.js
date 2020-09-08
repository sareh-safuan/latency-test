const startTimer = (req, res, next) => {
    res.locals.start = Date.now()
    next()
}

module.exports = startTimer