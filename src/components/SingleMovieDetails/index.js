import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CastDetails from '../CastDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCESS',
  failure: 'FAILURE',
}

class SingleMovieDetails extends Component {
  state = {
    movieData: {},
    apiStatus: apiStatusConstants.initial,
    movieId: 0,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getFormattedData = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    belongsToCollection: data.belongs_to_collection,
    budget: data.budget,
    genres: data.genres,
    homepage: data.homepage,
    id: data.id,
    imdbId: data.imdb_id,
    originCountry: data.origin_country,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    productionCompanies: data.production_companies,
    productionCountries: data.production_countries,
    releaseDate: data.release_date,
    revenue: data.revenue,
    runtime: data.runtime,
    spokenLanguages: data.spoken_languages,
    status: data.status,
    tagline: data.tagline,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=32cd164bcc55359e96c2633174a9359b&language=en-US`
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const movieDetails = this.getFormattedData(fetchedData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieData: movieDetails,
        movieId: id,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => <h1>Not Found</h1>

  renderSuccessView = () => {
    const {movieData, movieId} = this.state

    return (
      <div className="app-container">
        <Header />
        <div className="movie-details-bg-container">
          <div className="movie-details-section-bg-container">
            <div className="movie-poster-details-container">
              <img
                src={`https://image.tmdb.org/t/p/original${movieData.posterPath}`}
                className="movie-poster"
                alt="poster"
              />
              <div className="movie-details-container">
                <h1>{movieData.title}</h1>
                <p>Rating: {movieData.voteAverage}</p>
                <p>Duration: {movieData.runtime}</p>
                <div className="movie-genres">
                  {movieData.genres.map(each => (
                    <p className="genre">Genre: {each.name}</p>
                  ))}
                </div>
                <p>Release date: {movieData.releaseDate}</p>
                <p className="movie-overview">Overview: {movieData.overview}</p>
              </div>
            </div>
            <div className="cast-details-section">
              <h1>Casts</h1>
              <CastDetails theMovieId={movieId} />
            </div>
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

  renderMovieDetails = () => {
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
    return <>{this.renderMovieDetails()}</>
  }
}

export default SingleMovieDetails
