import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Searchbar from "./components/Searchbar"
import Results from "./components/Results"
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/results/:term" exact component={() => <Results />} />
          <Route
            path="/"
            exact
            component={() => (
              <>
                <Searchbar />
              </>
            )}
          />
        </div>
      </Switch>
    </Router>
  )
}

export default App
