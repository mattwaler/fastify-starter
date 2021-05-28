const fp = require('fastify-plugin')
const path = require('path')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-autoroutes'), {
    dir: path.join(__dirname, '../', '/routes'),
  })
})
