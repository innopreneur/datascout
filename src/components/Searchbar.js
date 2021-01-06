import React, { useState } from 'react'
import { Input, Icon, Image } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import Logo from './Logo'
import './Searchbar.css'

function Search() {
  const [searchTerm, setSearchTerm] = useState('')

  function searchResults(term) {
    alert(term)
    return <Redirect to={'/results?search=' + term} />
  }
  return (
    <div className='center'>
      <Logo />
      <Input
        size='massive'
        style={{
          width: 800,
          marginTop: 40,
          border: '3px solid black',
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={
          <Icon
            name='search'
            onClick={() => searchResults(searchTerm)}
            style={{ color: 'black' }}
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
