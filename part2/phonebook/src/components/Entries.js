import React from 'react';

const Entries = ({ persons, filter, deletePerson }) => {
  // Filter entries case insensitively, empty filter field means show all
  const filteredEntries = (filter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      {filteredEntries.map(person => 
        <p key={person.name}>
          {person.name} {person.number} &nbsp;                    
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Entries