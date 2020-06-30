import React, { useState } from 'react';

const Entries = ({ persons }) => {
  return (
    <div>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
   
    persons.map(person => person.name).includes(newName)
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat({ name: newName }))

    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Entries persons={persons} />
    </div>
  )
}

export default App;
