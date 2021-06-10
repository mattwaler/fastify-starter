require('dotenv').config()
const path = require('path')
const AutoLoad = require('fastify-autoload')
const mongoose = require('mongoose')

module.exports = async function (fastify, opts) {

  // Database connection
  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  // Load all plugins
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // Load all pages
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

}
