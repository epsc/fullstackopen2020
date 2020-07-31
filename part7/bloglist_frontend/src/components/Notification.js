import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  let variant
  if (notification.status === 'pass') {
    variant = 'success'
  } else if (notification.status === 'error') {
    variant = 'danger'
  }

  return (
    <Alert variant={variant}>
      {notification.message}
    </Alert>
  )
}

export default Notification