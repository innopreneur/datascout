import React, { useState, useEffect } from "react"
import { Button, Input, Icon } from "semantic-ui-react"
import { Link, useHistory } from "react-router-dom"
import Logo from "./Logo"
import Bubbles from "./Bubbles"
import "./Header.css"
import "../global.css"

export default function Header({ term, config }) {
  const [searchTerm, setSearchTerm] = useState(term)

  const history = useHistory()

  function searchResults(term) {
    history.push({
      pathname: "/results",
      search: `?search=${encodeURI(term)}`, // query string
      state: {
        // location state
        update: true,
        searchTerm: term
      }
    })
  }

  return (
    <>
      <header className="headerContainer">
        <Bubbles />
        <Link to="/">
          <Logo size={30} color="#000" />
        </Link>

        <Input
          size="medium"
          style={{
            border: "2px solid black",
            marginLeft: 30
          }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          icon={
            <Icon
              name="search"
              onClick={() => searchResults(searchTerm)}
              style={{ color: "black" }}
              inverted
              circular
              link
            />
          }
        />
      </header>
    </>
  )
}
