import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'

import { setSearchField, requestRobots } from '../actions'

function App({ onSearchChange, onRequestRobots, }) {

  const searchField = useSelector(state => state.searchRobots.searchField)
  const robots = useSelector(state => state.requestRobots.robots)
  const error = useSelector(state => state.requestRobots.error)
  const isPending = useSelector(state => state.requestRobots.isPending)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestRobots(dispatch))
  }, [])

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })

  return isPending ?
  <h1>Loading...</h1> :
  (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox
        searchChange={event => dispatch(setSearchField(event.target.value))}
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
