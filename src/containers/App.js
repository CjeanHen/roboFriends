import React, { useState, useEffect } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'

function App() {
  const [robots, setRobots] = useState([])
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => setRobots(users))
  }, [])

  const onSearchChange = (event) => {
    setSearchField(event.target.value)
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })

  return !robots.length ?
  <h1>Loading...</h1> :
  (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox
        searchChange={onSearchChange}
        searchField={searchField}
      />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  )
}

export default App
