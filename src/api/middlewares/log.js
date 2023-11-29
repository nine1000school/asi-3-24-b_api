const log = async (req, res, next) => {
  const now = Date.now()

  await next()

  // eslint-disable-next-line no-console
  console.info(`${req.method} ${req.url} ${Date.now() - now}ms`)
}

export default log
