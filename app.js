require('dotenv').config()
const path = require('path')
const AutoLoad = require('@fastify/autoload')
const mongoose = require('mongoose')

module.exports = async function (fastify, opts) {

  // Database connection
  mongoose.set('strictQuery', false)
  await mongoose.connect(process.env.DATABASE)

  // Load all plugins
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // Load all routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

}
