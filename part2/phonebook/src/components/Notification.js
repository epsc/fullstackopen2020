import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  if (notification.status === 'pass') {
    return (
      <div className='success'>
        {notification.message}
      </div>
    )
  }
}

export default Notification