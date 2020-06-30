import React, { useState } from 'react';
import Entries from './components/Entries'
import EntryForm from './components/EntryForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
   
  persons.map(person => person.name).includes(newName)
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }))

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add new</h2>
      <EntryForm 
        newName={newName} 
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Entries persons={persons} filter={filter} />
    </div>
  )
}

export default App;
