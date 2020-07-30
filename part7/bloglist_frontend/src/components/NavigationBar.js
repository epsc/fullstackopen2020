import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = ({ user, handleLogout }) => {
  const padding = { padding: 5 }

  const navStyle = {
    backgroundColor: 'lightGray',
    padding: 10
  }

  return (
    <div style={navStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <span style={padding}>{user.name} logged in </span>
      <span style={padding}><button onClick={handleLogout}>logout</button></span>
    </div>
  )
}

export default NavigationBar