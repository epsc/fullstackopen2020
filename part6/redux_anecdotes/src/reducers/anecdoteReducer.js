import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteInitial = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteInitial,
        votes: anecdoteInitial.votes += 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote)
    case 'NEW ANECDOTE':
      const newAnecdote = action.data
      return [...state, newAnecdote]
    case 'INIT ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW ANECDOTE',
    data
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer