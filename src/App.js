import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom"
import Searchbar from "./components/Searchbar"
import Results from "./components/Results"
import Bubbles from "./components/Bubbles"
import "./App.css"
import config from "./markets"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/results"
            exact
            component={() => <Results config={config} />}
          />
          <Route
            path="/"
            exact
            component={() => (
              <>
                <Bubbles />
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
