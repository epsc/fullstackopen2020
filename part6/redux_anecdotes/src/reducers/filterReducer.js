const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      state = action.data.filter
      return state
    default:
      return state
  }
}

export const changeFilter = (filter) => {
  return {
    type: 'CHANGE',
    data: { filter }
  }
}

export default filterReducer