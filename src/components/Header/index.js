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
        <div>
          <Link to="/">
            <button type="button" className="nav-btn">
              Popular
            </button>
          </Link>

          <Link to="/top-rated">
            <button type="button" className="nav-btn">
              Top Rated
            </button>
          </Link>

          <Link to="/upcoming">
            <button type="button" className="nav-btn">
              Upcoming
            </button>
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
          <Link
            to={`/${searchInput}`}
            className="link-container"
            
          >
            <button type="button" className="search-btn" onClick={this.onClickSearchBtn}>
              Search
            </button>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Header
