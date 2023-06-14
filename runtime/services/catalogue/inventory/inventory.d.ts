import { FastifyPluginAsync } from 'fastify'

interface GetProductSkuRequest {
  'sku': number;
}

interface GetProductSkuResponseOK {
}

interface Inventory {
  getProductSku(req: GetProductSkuRequest): Promise<GetProductSkuResponseOK>;
}

type InventoryPlugin = FastifyPluginAsync<NonNullable<inventory.InventoryOptions>>

declare module 'fastify' {
  interface ConfigureInventory {
    async getHeaders(req: FastifyRequest, reply: FastifyReply): Promise<Record<string,string>>;
  }
  interface FastifyInstance {
    'inventory': Inventory;
    configureInventory(opts: ConfigureInventory): unknown
  }

  interface FastifyRequest {
    'inventory': Inventory;
  }
}

declare namespace inventory {
  export interface InventoryOptions {
    url: string
  }
  export const inventory: InventoryPlugin;
  export { inventory as default };
}

declare function inventory(...params: Parameters<InventoryPlugin>): ReturnType<InventoryPlugin>;
export = inventory;
