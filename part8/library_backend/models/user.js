const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Assume default password for everybody, no need to create and save a password hash yet
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 2
  }
})
schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)