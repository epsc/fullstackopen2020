import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  // Fetch country data at the start of the application
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Event handler for search input
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
    <Countries
      countries={countries}
      search={search} 
      setSearch={setSearch} 
      setWeather={setWeather} 
      weather={weather}
    />
    </div>
  )
}

export default App