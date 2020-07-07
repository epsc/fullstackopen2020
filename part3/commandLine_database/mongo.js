const mongoose = require('mongoose')

const addInstruction = 'Add entry: node mongo.js <password> <"personName"> <phoneNumber>'
const displayInstruction = "Display phonebook entries: node mongo.js <password>"

if (process.argv.length < 3) {
  console.log(`Usage:\n${addInstruction}\n${displayInstruction}\n`)
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://fso2020:${password}@cluster0-shard-00-00.r1hdu.mongodb.net:27017,cluster0-shard-00-01.r1hdu.mongodb.net:27017,cluster0-shard-00-02.r1hdu.mongodb.net:27017/phonebook-app?ssl=true&replicaSet=atlas-5dg546-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.log("Connection error", error))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // Show phonebook entries
  Person.find({}).then(people => {
    console.log("Phonebook")
    people.forEach(person => {
      console.log(person.name, person.number)
    })

    mongoose.connection.close()
  }).catch(error => console.log("Search", error))
} else {
  // Add a new entry
  const person = new Person({
    name: name,
    number: number
  })
  
  person.save().then(result => {
    console.log("Person entry saved to database")
    mongoose.connection.close()
  })
}