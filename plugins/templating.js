const fp = require('fastify-plugin')
const path = require('path')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/view'), {
    engine: {
      twig: require('twig')
    },
    includeViewExtension: true,
    root: path.join(__dirname, '../', 'views'),
  })
})
