const http = require('http')
const { PORT } = require('./src/config')
const app = require('./src/app')

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('server running at port ' + PORT)
})
