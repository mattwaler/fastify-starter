const getServerData = require('../helpers/getServerData')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { data } = await getServerData(request)
    return reply.view('home', data)
  })

  fastify.get('/account', async function (request, reply) {
    const { data } = await getServerData(request)
    return reply.view('account', data)
  })

  fastify.get('/create', async function (request, reply) {
    const { session, data } = await getServerData(request)
    return session ? reply.redirect('/') : reply.view('create', data)
  })

  fastify.get('/login', async function (request, reply) {
    const { session, data } = await getServerData(request)
    return session ? reply.redirect('/') : reply.view('login', data)
  })
}
