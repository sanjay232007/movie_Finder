import React from 'react'

const Search = (props) => {
  return (
    <div className="search">
      <div>
        <img src="/Vector.svg" alt="search icon" />
        <img src="/Search-Input.png" alt="search icon" />

        <input 
        type="text"
        placeholder="Search for movies"
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
        />
      </div>
       
    </div>
  )
}

export default Search
