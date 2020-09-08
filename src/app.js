const express = require('express')
const startTimer = require('./middleware/startTimer')
const dbRequestUser = require('./middleware/dbRequestUser')
const dbRequestArticle = require('./middleware/dbRequestArticle')
const generateHash = require('./middleware/generateHash')
const compareHash = require('./middleware/compareHash')
const signToken = require('./middleware/signToken')

const app = express()

app.use(startTimer)

app.get('/', (req, res) => {
    const end = Date.now()
    res.locals.total = end - res.locals.start

    res.json({
        ok: 1,
        msg: 'simple request',
        rtime: res.locals
    })
})

app.get('/single', dbRequestUser('firstDB'), async (req, res) => {
    const end = Date.now()
    res.locals.total = end - res.locals.start

    res.json({
        ok: 1,
        msg: 'single DB request',
        rtime: res.locals
    })
})

app.get('/twice',
    [dbRequestUser('firstDB'), dbRequestArticle('secondDB')],
    (req, res) => {
        const end = Date.now()
        res.locals.total = end - res.locals.start

        res.json({
            ok: 1,
            msg: 'twice DB request',
            rtime: res.locals
        })
    })

app.get('/thrice',
    [dbRequestUser('firstDB'), dbRequestArticle('secondDB'), dbRequestUser('thirdDB')],
    (req, res) => {
        const end = Date.now()
        res.locals.total = end - res.locals.start

        res.json({
            ok: 1,
            msg: 'thrice DB request',
            rtime: res.locals
        })
    })

app.get('/hash', generateHash('hash'), (req, res) => {
    const end = Date.now()
    res.locals.total = end - res.locals.start

    res.json({
        ok: 1,
        msg: 'generate hash',
        rtime: res.locals
    })
})

app.get('/db-hash',
    [dbRequestUser('firstDB'), generateHash('hash')],
    (req, res) => {
        const end = Date.now()
        res.locals.total = end - res.locals.start

        res.json({
            ok: 1,
            msg: '1 db req + hash',
            rtime: res.locals
        })
    })

app.get('/db2-hash',
    [dbRequestUser('firstDB'), dbRequestArticle('secondDB'), generateHash('hash')],
    (req, res) => {
        const end = Date.now()
        res.locals.total = end - res.locals.start

        res.json({
            ok: 1,
            msg: '2 db req + hash',
            rtime: res.locals
        })
    })

app.get('/chash', compareHash('cHash'), (req, res) => {
    const end = Date.now()
    res.locals.total = end - res.locals.start

    res.json({
        ok: 1,
        msg: 'compare hash',
        rtime: res.locals
    })
})

app.get('/db-chash',
    [dbRequestUser('firstDB'), compareHash('chash')],
    (req, res) => {
        const end = Date.now()
        res.locals.total = end - res.locals.start

        res.json({
            ok: 1,
            msg: '1db + compare hash',
            rtime: res.locals
        })
    })

app.get('/db-hash2',
    [dbRequestUser('firstDB'), compareHash('chash'), generateHash('hash')],
    (req, res) => {
        const end = Date.now()
        res.locals.total = end - res.locals.start

        res.json({
            ok: 1,
            msg: '1db + chash + hash',
            rtime: res.locals
        })
    })

app.get('/db2-hash2',
    [dbRequestUser('firstDB'), compareHash('chash'), generateHash('hash'), dbRequestArticle('secondDB')],
    (req, res) => {
        const end = Date.now()
        res.locals.total = end - res.locals.start

        res.json({
            ok: 1,
            msg: '2db + chash + hash',
            rtime: res.locals
        })
    })

app.get('/stoken', signToken('signToken'), (req, res) => {
    const end = Date.now()
    res.locals.total = end - res.locals.start

    res.json({
        ok: 1,
        msg: 'sign token',
        rtime: res.locals
    })
})

module.exports = app