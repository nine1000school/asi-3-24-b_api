import methodNotAllowed from "@/api/middlewares/methodNotAllowed"

const mw = (handlers) => async (req, res) => {
  const middlewares = handlers[req.method]
  const sanitizedMiddlewares = [...(middlewares || [methodNotAllowed])]
  let currentMiddlewareIndex = 0
  const next = async () => {
    const middleware = sanitizedMiddlewares[currentMiddlewareIndex]
    currentMiddlewareIndex += 1

    await middleware(req, res, next)
  }

  await next()
}

export default mw
