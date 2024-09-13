import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleVote = () => {
    console.log("vote clicked")
    const copy = [...votes]
    copy[selected] = copy[selected] + 1
    console.log("votes copy ", copy);
    //votes[selected] = copy[selected]
    setVotes(copy)
    console.log("updated votes ", votes)
  }
  const handleClick = () => {
    console.log("next anecdote clicked")
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  console.log("selected ", selected)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} </p>
      <Button handleClick={handleVote} text='vote ' />
      <Button handleClick={handleClick} text='next anecdote ' />
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostVotes = ({votes, anecdotes}) => {
  let max = Math.max(...votes)
  let index = votes.indexOf(max)
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {max} votes</p>
    </div>
  )
}

export default App
