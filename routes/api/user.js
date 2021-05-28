const validator = require('validator')
const bcrypt = require('bcrypt')
const User = require('../../models/User')

module.exports = (fastify) => ({
  post: {
    handler: async (request, reply) => {
      const { body } = request;
      // Validate Email
      if (!validator.isEmail(body.email)) {
        return reply.send({
          success: false,
          message: "Please use a valid email address",
        });
      }
      const hashedPassword = await bcrypt.hash(
        body.password,
        parseInt(process.env.SALT_ROUNDS)
      );
      try {
        const data = await User.create({
          ...body,
          password: hashedPassword,
        });
        return reply.send({ success: true, data });
      } catch (err) {
        return reply.send({ success: false, data: err });
      }
    },
  },
  patch: {
    handler: async (request, reply) => {
      const session = request.session.get("session");

      // Authenticate
      if (!session) {
        return reply.send({
          success: false,
          message: "Not authenticated",
        });
      }

      // Validate Email
      if (!validator.isEmail(request.body.email)) {
        return reply.send({
          success: false,
          message: "Please use a valid email address.",
        });
      }

      // Update
      try {
        const user = await User.findOneAndUpdate(session.id, request.body, {
          new: true,
        });
        return reply.send({
          success: true,
          user,
          message: "Account updated successfully!",
        });
      } catch (err) {
        return reply.send({
          success: false,
          data: err,
          message: "There was an issue updating your account.",
        });
      }
    },
  },
});
