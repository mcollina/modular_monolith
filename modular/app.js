import fastify from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'desm'

export async function build (opts = {}) {
  const app = fastify(opts)

  app.register(autoload, {
    dir: join(import.meta.url, 'plugins'),
    encapsulate: false,
    maxDepth: 1
  })

  app.register(autoload, {
    dir: join(import.meta.url, 'modules'),
    encapsulate: false,
    maxDepth: 1
  })

  return app
}
