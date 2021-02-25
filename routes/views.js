const User = require('../models/User')

async function getServerData(request) {
  const session = request.session.get('session')
  let data = {
    devMode: process.env.NODE_ENV !== 'production'
  }
  if (session) {
    const user = await User.findById(session.id)
    data = { ...data, email: user.email }
  }
  return {
    data,
    session,
  }
}

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
