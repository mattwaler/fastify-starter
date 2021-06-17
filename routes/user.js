const User = require('../models/User')
const bcrypt = require('bcrypt')
const validator = require('validator')

module.exports = async function (fastify, opts) {
  // Create New User
  fastify.post('/api/user', async function (request, reply) {
    const { body } = request

    // Validate Email
    if (!validator.isEmail(body.email)) {
      return reply.view('partials/response', {
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
      return reply.view('partials/response', {
        success: false,
        message: 'Something went wrong.',
      })
    }
  })

  // Update User
  fastify.patch('/api/user', async function (request, reply) {
    const session = request.session.get('session')

    // Authenticate
    if (!session) {
      return reply.view('partials/response', {
        success: false,
        message: 'Not authenticated.',
      })
    }

    // Validate Email
    if (!validator.isEmail(request.body.email)) {
      return reply.view('partials/response', {
        success: false,
        message: 'Invalid email address.',
      })
    }

    // Update
    try {
      await User.findOneAndUpdate(session.id, request.body, { new: true })
      return reply.view('partials/response', {
        success: true,
        message: 'Account updated!',
      })
    } catch (err) {
      console.log(err)
      return reply.view('partials/response', {
        success: false,
        message: 'There was an error updating your account.',
      })
    }
  })
}
