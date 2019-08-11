export function delay(ms) {
  return (...args) => new Promise((resolve) => {
    setTimeout(
      () => resolve(...args),
      ms
    )
  })
}