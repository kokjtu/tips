const process = require('process')

process.on('SIGINT', async () => {
    // await disconnect
    // exit
    process.exit(0)
})