import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Searchbar from './components/Searchbar'
import Results from './components/Results'
import './App.css'
import config from './markets'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route
            path='/results/:term'
            exact
            component={() => <Results config={config} />}
          />
          <Route
            path='/'
            exact
            component={() => (
              <>
                <Searchbar />
              </>
            )}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
