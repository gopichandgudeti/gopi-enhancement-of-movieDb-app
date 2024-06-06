import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css'

import Popular from './components/Popular'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SingleMovieDetails from './components/SingleMovieDetails'
import SearchedMovies from './components/SearchedMovies'

// write your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/videos/:id" component={SingleMovieDetails} />
        <Route exact path="/:searchInput" component={SearchedMovies} />
      </Switch>
    )
  }
}

export default App
