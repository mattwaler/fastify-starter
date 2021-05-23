const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 64,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
