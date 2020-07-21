import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))

    const anecdote = anecdotes.find(anecdote => anecdote.id === id).content
    
    // notification
    dispatch(setNotification(`you voted for '${anecdote}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  // Sort function for anecdotes in descending order
  const sortByVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort(sortByVotes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList