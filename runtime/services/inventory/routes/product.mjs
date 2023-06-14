
class Inventory {
  async howManyInStore(sku) {
    if (sku === 42) {
      return 2
    } else {
      return 0
    }
  }
}

export default async function (fastify, opts) {
  const inventory = new Inventory()

  fastify.get('/product/:sku', {
    schema: {
      params: {
        type: 'object',
        properties: {
          sku: { type: 'number' }
        }
      }
    }
  }, async (request, reply) => {
    const sku = request.params.sku
    return { sku, inStore: await inventory.howManyInStore(sku) }
  })
}
