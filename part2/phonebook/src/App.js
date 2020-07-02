import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Entries from './components/Entries'
import EntryForm from './components/EntryForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })    
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const personObject = ({name: newName, number: newNumber})
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')        
        })
    }
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
