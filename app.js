require('dotenv').config()
const path = require('path')
const AutoLoad = require('fastify-autoload')
const mongoose = require('mongoose')

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  // Binding fastify to a port for deployment
  fastify.listen(process.env.PORT || 3000, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}
