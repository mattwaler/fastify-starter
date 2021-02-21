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

  // Get All Users
  fastify.get('/api/user', async function (request, reply) {
    try {
      const users = await User.find()
      return reply.code(200).send({
        success: true,
        users,
      })
    } catch (err) {
      return reply.code(400).send({
        success: false,
        data: err
      })
    }
  })

  // Get One User
  fastify.get('/api/user/:id', async function (request, reply) {
    const { id } = request.params

    try {
      const user = await User.findById(id)
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
