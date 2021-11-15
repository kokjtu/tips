const debounce = (fn, delay) => {
  delay = delay || 0
  let timerId
  console.log('timerId immediate load:::', timerId)
  return () => {
    console.log(`timerId previous at:::${timerId}`)
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    timerId = setTimeout(() => {
      fn()
    }, delay)
  }
}
