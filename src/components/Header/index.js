import React, {useState} from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import './index.css'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()

  const onSearch = event => {
    event.preventDefault()

    const query = searchInput.trim()

    if (query !== '') {
      history.push(`/search?query=${encodeURIComponent(query)}&page=1`)
    }
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand-link">
        <h1 className="brand-title">movieDB</h1>
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        

        <NavLink
          to="/top-rated"
          className="nav-link"
          activeClassName="active-link"
        >
          Top Rated
        </NavLink><NavLink
  exact
  to="/"
  className="nav-link"
  activeClassName="active-link"
  aria-label="Popular"
>
  <span aria-hidden="true">Home</span>
</NavLink>

        <NavLink
          to="/upcoming"
          className="nav-link"
          activeClassName="active-link"
        >
          Upcoming
        </NavLink>
      </nav>

      <form className="search-form" onSubmit={onSearch} role="search">
        <input
          type="text"
          aria-label="Search movies"
          placeholder="Search movies..."
          className="search-input"
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </header>
  )
}

export default Header
