const throttle = (fn, delay) => {
  delay = delay || 0
  let last = 0
  return () => {
    const now = new Date().getTime()
    if (now - last < delay) {
      return
    }
    last = now
    fn()
  }
}
