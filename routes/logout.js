module.exports = async function (fastify, opts) {
  fastify.get('/api/logout', async function (request, reply) {
    request.session.delete('session')
    return reply.redirect('/')
  })
}
