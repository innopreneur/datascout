import React, { useState } from "react"
import { Input, Icon, Image } from "semantic-ui-react"
import { Link, Redirect, useHistory } from "react-router-dom"
import Logo from "./Logo"
import "./Searchbar.css"

function Search() {
  const [searchTerm, setSearchTerm] = useState("")
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
    <div className="center">
      <Logo size={80} />
      <Input
        size="massive"
        style={{
          width: 800,
          marginTop: 40,
          border: "3px solid black"
        }}
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
    </div>
  )
}

export default Search
