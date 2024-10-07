import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
  personsService
      .getAll('http://localhost:3001/persons')
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      console.log("oli tää nimi")
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(newName, newNumber)
        return
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
      })
  }

  const updatePerson = (newName, newNumber) => {
    const person = persons.find(p => p.name === newName)
    const changedPerson = { ...person, number: newNumber }
    personsService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
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

  const handleDelete = (id) => {
    console.log("lets handle delete " + id)
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}`)){
      personsService
        .remove(id)
      setPersons(persons.filter(p => p.id !== id));
    }
  }

  return (
    <div>
      debug: {newName}
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonAdd={handlePersonAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      )}
    </div>
  )

}

export default App
