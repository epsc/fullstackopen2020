const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(url)

mongoose.connect(url, { useNewUrlPerser: true, useUnifiedTopology: true})
  .then(result => {
    console.log("Connected to the database")
  })
  .catch(error => {
    console.log("Error connecting to the database", error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)