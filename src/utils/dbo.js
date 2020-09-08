const MongoClient = require('mongodb').MongoClient
const { DB_URL, DB_NAME } = require('../config')

const dbo = {
    connection: null
}

;(async function() {
    const client = await MongoClient.connect(DB_URL, { useUnifiedTopology: true })

    dbo.connection = client.db(DB_NAME)
    console.log('connected to DB server')
})()

module.exports = dbo
