const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('geterror', (err) => {
  console.log(`Error:::`, err)
})

setTimeout(() => {
  myEvent.emit('geterror', { msg: 'Loi roi' })
}, 2000)
