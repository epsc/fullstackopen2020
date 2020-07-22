const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET NOTIFICATION':
      // first cancel the removal of previous notification if any
      clearTimeout(state.timeoutID)

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
    // store timeout id of removeNotification to state store so we can cancel if necessary
    const timeoutID = setTimeout(() => 
      dispatch(removeNotification()), 
      timeout
    )

    dispatch({
      type: 'SET NOTIFICATION',
      data: {
        notification,
        timeoutID
      }
    })
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE NOTIFICATION',
    data: ''
  }
}

export default notificationReducer