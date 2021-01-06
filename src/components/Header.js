import React, { useState, useEffect } from "react"
import { Button, Input, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "./Header.css"
import "../global.css"

export default function Header({ config, setSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {}, [config])
  return (
    <>
      <header className="headerContainer">
        <Link to="/">
          <h2 className="brand applogo">Data Scout</h2>
        </Link>
        <Input
          icon={
            <Icon
              name="search"
              onClick={() => setSearch(searchTerm)}
              inverted
              circular
              link
            />
          }
          placeholder="Search Data..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </header>
    </>
  )
}
