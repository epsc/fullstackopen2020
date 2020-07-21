const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET NOTIFICATION':
      state = action.data
      return state
    case 'REMOVE NOTIFICATION':
      state = action.data
      return state
    default:
      return state
  }
}

export const setNotification = notification => {
  return {
    type: 'SET NOTIFICATION',
    data: notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE NOTIFICATION',
    data: ''
  }
}

export default notificationReducer