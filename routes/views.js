const User = require('../models/User')

module.exports = async function (fastify, opts) {

  // Homepage
  fastify.get('/', async function (request, reply) {
    let data = {}
    const session = request.session.get('session')
    if (session) {
      const user = await User.findById(session.id)
      data = {
        email: user.email,
      }
    }
    return reply.view('index', data)
  })

  // Login
  fastify.get('/login', async function (request, reply) {
    const session = request.session.get('session')
    if (session) {
      return reply.redirect('/')
    }
    return reply.view('login')
  })

  // Login
  fastify.get('/create', async function (request, reply) {
    const session = request.session.get('session')
    if (session) {
      return reply.redirect('/')
    }
    return reply.view('create')
  })

}
