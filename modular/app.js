import fastify from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'desm'

export async function build (opts = {}) {
  const app = fastify(opts)

  app.register(autoload, {
    dir: join(import.meta.url, 'modules'),
    encapsulate: false,
    maxDepth: 1
  })

  app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
      reply.code(403)
      return err.message
    }
    request.log.error({ err })
    reply.code(err.statusCode || 500)

    return "I'm sorry, there was an error processing your request."
  })

  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404)
    return "I'm sorry, I couldn't find what you were looking for."
  })

  return app
}
