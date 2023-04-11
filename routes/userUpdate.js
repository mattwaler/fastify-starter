const User = require('../models/User')
const validator = require('validator')
const delay = require('../helpers/delay')

module.exports = async function (fastify, opts) {
  fastify.patch('/api/user', async function (request, reply) {
    const session = request.session.get('session')

    await delay(1000)

    // Authenticate
    if (!session) {
      return reply.view('partials/alert', {
        success: false,
        message: 'Not authenticated.',
      })
    }

    // Validate Email
    if (!validator.isEmail(request.body.email)) {
      return reply.view('partials/alert', {
        success: false,
        message: 'Invalid email address.',
      })
    }

    // Update
    try {
      await User.findOneAndUpdate(session.id, request.body, { new: true })
      return reply.view('partials/alert', {
        success: true,
        message: 'Your account details have been updated successfully.',
      })
    } catch (err) {
      console.log(err)
      return reply.view('partials/alert', {
        success: false,
        message: 'There was an error updating your account. Please try again.',
      })
    }
  })
}
