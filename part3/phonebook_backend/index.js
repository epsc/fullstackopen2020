const express = require('express')
const morgan = require('morgan')

const app = express()

// Log data using morgan middleware (for the exercise only) 
// Don't log personal data, even in the console, to avoid violating privacy laws!)
morgan.token('data', (request, response) => {
  console.log(request.body)
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const numPersons = persons.length
  const info = `Phonebook has info for ${numPersons} people`
  
  response.send(`<div>${info}</div><br /><div>${new Date()}</div>`)
})

const generateId = (persons) => {
  const usedIds = persons.map(persons => persons.id)
  const min = 1
  const max = 999999
  
  // generate random Id, but make sure already used id is not used again
  do {
    id = Math.floor(Math.random() * (max - min) + min)
  } while (usedIds.includes(id))

  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  // Handle missing name or number
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Missing name or number'
    })
  }
  // Handle if name is already in the phonebook
  if (persons.map(person => person.name.toLowerCase()).includes(body.name.toLowerCase())) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  // Create a person object and add to persons
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(persons)
  }
  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})