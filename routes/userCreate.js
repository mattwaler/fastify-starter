const User = require('../models/User')
const bcrypt = require('bcrypt')
const validator = require('validator')

module.exports = async function (fastify, opts) {
  fastify.post('/api/user', async function (request, reply) {
    const { body } = request

    // Validate Email
    if (!validator.isEmail(body.email)) {
      return reply.view('partials/alert', {
        success: false,
        message: 'Please use a valid email address.',
      })
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(process.env.SALT_ROUNDS)
    )

    // Attempt to Create New User
    try {
      await User.create({ ...body, password: hashedPassword })
      return reply.header('HX-Redirect', '/login').send({ success: true })
    } catch (err) {
      return reply.view('partials/alert', {
        success: false,
        message: 'Something went wrong.',
      })
    }
  })
}
