const fp = require('fastify-plugin')
const { readFileSync } = require('fs')
const path = require('path')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-secure-session'), {
    cookieName: 'session',
    key: readFileSync(path.join(__dirname, '../', 'secret-key')),
    cookie: {
      path: '/'
    }
  })
})
