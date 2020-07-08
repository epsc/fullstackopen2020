import React, { useState, useEffect } from 'react';
import Entries from './components/Entries'
import EntryForm from './components/EntryForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialList => {
        setPersons(initialList)
      })   
  }, [])

  const displayNotification = (status, message) => {
    setNotification({
      status: status,
      message: message
    })
    // Remove notification message after 5 seconds
    setTimeout(() => {setNotification(null)}, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      const confirmation = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      
      if (confirmation) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            displayNotification(
              'pass',
              `The phone number of ${returnedPerson.name} has been updated`
            )
          })
          .catch(error => {
            if (error.response.data.error.startsWith('Validation failed')) {
              displayNotification('error', error.response.data.error)
            } else {
              setPersons(persons.filter(person => person.id !== changedPerson.id))
              displayNotification(
                'error',
                `Information of ${changedPerson.name} has already been removed from the server`
              )
            }
          })
      }
    } else {
      const personObject = ({name: newName, number: newNumber})
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          displayNotification(
            'pass',
            `${returnedPerson.name} added`
          )
        })
        .catch(error => {
          displayNotification('error', error.response.data.error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const deletePerson = persons.find(person => person.id === id)
    const confirmation = window.confirm(`Delete ${deletePerson.name} ?`)
    
    if (confirmation) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletePerson.id))
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
      <Notification notification={notification} />
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
      <Entries 
        persons={persons}
        filter={filter} 
        deletePerson={deletePerson} 
      />
    </div>
  )
}

export default App;
