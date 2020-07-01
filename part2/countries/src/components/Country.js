import React from 'react'
import Weather from './Weather'

const Country = ({ country, setWeather, weather }) => {
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
      <h3>Weather in {country.capital}</h3>
      <Weather country={country} setWeather={setWeather} weather={weather}/>
    </div>
  )
}

export default Country