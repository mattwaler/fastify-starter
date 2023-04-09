const User = require('../models/User')
const validator = require('validator')

module.exports = async function (fastify, opts) {
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
