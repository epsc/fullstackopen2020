import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    console.log('vote', id)
    const anecdote = props.anecdotes.find(anecdote => anecdote.id === id)
    props.voteAnecdote(anecdote)
    
    // notification
    props.setNotification(`you voted for '${anecdote.content}'`, 5)
  }

  // Sort function for anecdotes in descending order
  const sortByVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      {props.anecdotes.sort(sortByVotes)
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

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes
  const filter = state.filter
  
  // returns the filtered state already, instead of doing the filtering in the component
  return {
    anecdotes: anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)