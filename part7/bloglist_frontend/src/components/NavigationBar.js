import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const NavigationBar = ({ user, handleLogout }) => {
  const padding = { marginRight: 5 }

  return (
    <Navbar variant="dark" expand="lg" bg="dark" className="mb-3">
      <Navbar.Brand as={Link} to="/">Blogs</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as={Link} to="/">home</Nav.Link>
          <Nav.Link as={Link} to="/users">users</Nav.Link>
        </Nav>
        <Navbar.Text className="justify-content-end" style={padding}>
          {user.name} logged in
        </Navbar.Text>
        <Button variant="outline-info" onClick={handleLogout}>logout</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar