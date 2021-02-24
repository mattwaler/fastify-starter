const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = async function (fastify, opts) {

  // Login
  fastify.post('/api/login', async function (request, reply) {
    const { body } = request
    try {
      const user = await User.findOne({ email: body.email })
      const match = await bcrypt.compare(body.password, user.password)
      if (match) {
        request.session.set('session', { id: user._id })
        return reply.code(200).send({
          success: true,
        })
      }
    } catch (err) {
      return reply.code(400).send({
        success: false,
        data: err
      })
    }
  })

  // Logout
  fastify.get('/api/logout', async function (request, reply) {
    request.session.delete('session')
    return reply.redirect('/')
  })

}
