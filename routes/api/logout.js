module.exports = (fastify) => ({
  get: {
    handler: async (request, reply) => {
      request.session.delete('session')
      return reply.redirect('/')
    }
  },
})
