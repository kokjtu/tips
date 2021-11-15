const process = require('process')
const os = require('os')

// Increase nodejs perfomance x3
process.env.UV_THREADPOOL_SIZE = os.cpus().length