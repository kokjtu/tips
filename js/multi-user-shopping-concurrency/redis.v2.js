const express = require('express')
const app = express()

const { get, set, setnx, incrby, exists } = require('./model.redis')

app.get('/order', async (req, res) => {
  const time = new Date().getTime()
  console.log(`Time request::::::::${time}`)

  // assume current inventory is 10
  const inventory = 10

  // product name
  const keyName = 'iPhone13'

  // assume that for each purchase, the inventory consumption quantity is 1
  const purchase = 1

  // quantity sold, if not sold -> set = 0 else update + 1 each time order success
  const getKey = await exists(keyName)
  if (!getKey) {
    // set = 0
    await setnx(keyName, 0)
  }

  // get quantity sold
  let sold = await get(keyName)
  console.log('sold before user order successfuly ===', sold)
  // if sold + purchase > inventory then return failed!
  sold = await incrby(keyName, purchase) // Atom redis
  if (sold > inventory) {
    console.log('Out of stock')
    return res.json({
        status: 'error',
        msg: 'Out of stock',
        time
    })
  }

  // if user order successfuly
  console.log('sold after order success ===', sold)

  if (sold > inventory) {
      await set('soldout', sold - inventory)
  }

  return res.json({
    status: 'success',
    msg: 'OK',
    time,
  })
})

app.listen(3000, () => {
  console.log(`The server running at 3000`)
})
