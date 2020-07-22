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

export const setNotification = (notification, timeoutInSeconds) => {
  return async dispatch => {
    const timeout = timeoutInSeconds * 1000
    dispatch({
      type: 'SET NOTIFICATION',
      data: notification
    })
    setTimeout(() => 
      dispatch(removeNotification()), 
      timeout
    )
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE NOTIFICATION',
    data: ''
  }
}

export default notificationReducer