import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Anecdote = ({ anecdotes, points, selected }) => {
  
  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))
  
  // Select a random anecdote function
  const randomAnecdote = () => {
    let max = props.anecdotes.length
    // Generate a random index between 0 and the length of anecdotes array
    let index = Math.floor(Math.random() * max)
    //console.log(index)

    return setSelected(index)
  }

  // Function to update number of votes for a specific anecdote
  const vote = () => {
    // Copy the state, add to tally of index of currently selected anecdote
    const updatedVotes = [...points]
    //console.log(updatedVotes)
    updatedVotes[selected] += 1

    return setPoints(updatedVotes)
  }

  // Gets index of anecdote with the highest number of votes
  const mostVotesIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={props.anecdotes} selected={selected} points={points} />
      <button onClick={() => randomAnecdote()}>next anecdote</button>
      <button onClick={() => vote()}>vote</button>
      <h1>Anecdote with most Votes</h1>
      <Anecdote anecdotes={props.anecdotes} selected={mostVotesIndex} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))