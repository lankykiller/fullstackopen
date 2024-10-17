import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countriesService from './services/Countries'
import Country from './components/Country'
import OneCountry from './components/OneCountry'

const App = () => {

  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const [countries, setCountires] = useState([])

  useEffect(() => {
    console.log('use effect')

    if (countries) {
      console.log('fetching countries')
      countriesService
        .getAll()
        .then(initialCountries => {
          setCountires(initialCountries)
        })
    }
  }, [])

  console.log(countries)

  const countriesToShow = filter
    ? countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries



  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilter} />
      {countriesToShow.length > 10 && <p>Too many matches, please narrow down your search.</p>}
      {countriesToShow.length <= 10 && countriesToShow.length > 1 && countriesToShow.map((country) => (
        <Country key={country.name.official} country={country} />
      ))}
      {countriesToShow.length === 1 && countriesToShow.map((country) =>  (
        <OneCountry country={country} />  
      ))}
    </div>
  )
}

export default App
