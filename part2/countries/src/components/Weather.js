import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country, setWeather, weather }) => {

  const query = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`

  useEffect(() => {
    // Set weather to null for current country first, to prevent cases where previously fetched info is displayed
    setWeather(null)
    // Fetch weather information
    axios
      .get(query)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [ query, setWeather ])

  if (weather !== null) {
    return (
      <div>
        <div><b>temperature: </b>{weather.temperature} Celcius</div>
        <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
        <div><b>wind: </b>{weather.wind_speed} kph direction {weather.wind_dir}</div>
      </div>
    )    
  }

  return (
    <div>
      No weather information
    </div>
  )
}

export default Weather