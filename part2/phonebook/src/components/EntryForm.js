import React from 'react'

const EntryForm = ({newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default EntryForm