import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      console.log("oli tää nimi")
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonAdd = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  return (
    <div>
      debug: {newName}
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonAdd={handlePersonAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )

}

export default App