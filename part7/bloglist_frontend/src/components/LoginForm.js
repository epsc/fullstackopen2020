import React from 'react'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  return (
    <div className="container">
      <h2>log in to application</h2>
      <Notification />
      <Form onSubmit={props.handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm