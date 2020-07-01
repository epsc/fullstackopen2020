import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => 
          <li key={language.iso639_2}>{language.name}</li>
        )}
      </ul>
      <img
        src={country.flag} 
        alt={country.name + ' flag'} 
        width='10%' 
        length='10%' 
      />
    </div>
  )
}

export default Country