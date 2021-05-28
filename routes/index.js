const getServerData = require('../helpers/getServerData')

module.exports = (fastify) => ({
  get: {
    handler: async (request, reply) => {
      const { data } = await getServerData(request)
      return reply.view('home', data)
    }
  },
})
