'use strict'

const pltClient = require('@platformatic/client')
const { join } = require('path')

async function generateInventoryClientPlugin (app, opts) {
  app.register(pltClient, {
    type: 'openapi',
    name: 'inventory',
    path: join(__dirname, 'inventory.openapi.json'),
    url: opts.url,
    fullResponse: false
  })
}

generateInventoryClientPlugin[Symbol.for('plugin-meta')] = {
  name: 'inventory OpenAPI Client'
}
generateInventoryClientPlugin[Symbol.for('skip-override')] = true

module.exports = generateInventoryClientPlugin
module.exports.default = generateInventoryClientPlugin
