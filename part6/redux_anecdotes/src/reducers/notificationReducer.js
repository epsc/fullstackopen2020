const notificationReducer = (state = 'Initial notification', action) => {
  switch (action.type) {
    case 'SET NOTIFICATION':
      return state
    default:
      return state
  }
}

export const setNotification = notification => {
  return {
    type: 'SET NOTIFICATION',
    notification
  }
}

export default notificationReducer