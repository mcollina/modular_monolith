import fp  from 'fastify-plugin'

class Inventory {
  async howManyInStore(sku) {
    if (sku === 42) {
      return 2
    } else {
      return 0
    }
  }
}

async function inventory (fastify) {
  fastify.decorate('inventory', new Inventory())
}

export default fp(inventory)
