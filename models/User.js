const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 64,
  },
  name: {
    type: String,
    maxlength: 64,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
