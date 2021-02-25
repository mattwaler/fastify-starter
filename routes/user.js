const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = async function (fastify, opts) {

  // Create New User
  fastify.post('/api/user', async function (request, reply) {
    const { body } = request
    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(process.env.SALT_ROUNDS)
    )
    try {
      const data = await User.create({
        ...body,
        password: hashedPassword,
      })
      return reply.code(200).send({
        success: true,
        data,
      })
    } catch (err) {
      return reply.code(400).send({
        success: false,
        data: err
      })
    }
  })

  // Update User
  fastify.patch('/api/user', async function (request, reply) {
    const session = request.session.get('session')
    // Disallow if no session
    if (!session) {
      return reply.code(401).send({ success: false })
    }
    try {
      const user = await User.findOneAndUpdate(session.id, request.body, { new: true })
      return reply.code(200).send({
        success: true,
        user,
      })
    } catch (err) {
      return reply.code(400).send({
        success: false,
        data: err
      })
    }
  })
}
