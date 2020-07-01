import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  // Fetch country data at the start of the application
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries
      <input 
        value={search}
        onChange={handleSearchChange}
      />
    <Countries countries={countries} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App