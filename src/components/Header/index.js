import './index.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'

class Header extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.setState({searchInput: ''})
  }

  render() {
    const {searchInput} = this.state

    return (
      <nav className="nav-bar-bg-container fixed-top">
        <h1 className="app-logo">movieDB</h1>
        <div className="nav-links-container">
          <Link to="/" className="nav-link">
            <h1 className="nav-link-text">Popular</h1>
          </Link>

          <Link to="/top-rated" className="nav-link">
            <h1 className="nav-link-text">Top Rated</h1>
          </Link>

          <Link to="/upcoming" className="nav-link">
            <h1 className="nav-link-text">Upcoming</h1>
          </Link>
        </div>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search for movies"
            className="search-input-container"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
          <Link to={`/${searchInput}`} className="link-container">
            <button
              type="button"
              className="search-btn"
              onClick={this.onClickSearchBtn}
            >
              Search
            </button>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Header
