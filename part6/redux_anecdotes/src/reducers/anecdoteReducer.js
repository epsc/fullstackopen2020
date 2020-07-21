const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


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
  return {
    type: 'INIT ANECDOTES',
    data: anecdotes
  }
}

export const createAnecdote = (anecdote) => {
  const anecdoteObject = asObject(anecdote)
  return ({
    type: 'NEW ANECDOTE',
    data: anecdoteObject
  })
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer