export default async function (app, opts) {
  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404)
    return "I'm sorry, I couldn't find what you were looking for."
  })
}
