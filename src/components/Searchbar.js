import React, { useState } from "react"
import { Input, Icon, Image } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom"
import "./Searchbar.css"

function Search() {
  const [searchTerm, setSearchTerm] = useState("")

  function searchResults(term) {
    alert(term)
    return <Redirect to={"/results?search=" + term} />
  }
  return (
    <div className="center">
      <Image
        className="logo"
        src={process.env.PUBLIC_URL + "/datascout-logo.svg"}
      ></Image>
      <Input
        size="massive"
        onChange={e => setSearchTerm(e.target.value)}
        icon={
          <Icon
            name="search"
            onClick={() => searchResults(searchTerm)}
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
