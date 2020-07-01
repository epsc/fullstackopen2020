import React from 'react'
import Country from './Country'

const Countries = ({ countries, search }) => {
  const filteredCountries = countries
    .filter(country => 
      country.name.toLowerCase()
      .includes(search.toLowerCase()))
  
    // Render instructions if no search input
  if (search === '') {
    return (
      <div>Specify a country to search for</div>
    )
  }
  // Render country information if only one country matches
  if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  }
  
  // Render list of countries if there are 10 or less countries that match query
  if (filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map(country => <div key={country.alpha2Code}>{country.name}</div>)}
      </div>
    )
  } 

  // Else specify that there are too many matches
  return (
    <div>Too many matches, specify another filter</div>
  )
}

export default Countries