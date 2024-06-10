import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCESS',
  failure: 'FAILURE',
}

class TopRatedMovies extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovies()
  }

  getFormattedData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(movie => ({
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      genreIds: movie.genre_ids,
      id: movie.id,
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      video: movie.video,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    })),
  })

  getMovies = async (page = 1) => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=32cd164bcc55359e96c2633174a9359b&language=en-US&page=${page}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const fetchedData = this.getFormattedData(data)

      this.setState({
        moviesList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {moviesList} = this.state
    return (
      <div className="app-container">
        <Header />
        <div className="app-bg-container">
          <ul className="movies-list-container">
            {moviesList.results.map(item => (
              <MovieCard movieData={item} key={item.id} />
            ))}
          </ul>
          <div className="pagination-container">
            <Pagination
              totalPages={moviesList.totalPages}
              apiCallback={this.getMovies}
            />
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <h1>Not Results Found</h1>

  renderVideosView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {moviesList} = this.state
    return <>{this.renderVideosView()}</>
  }
}

export default TopRatedMovies
