import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieData} = props
  const {id, posterPath, title, voteAverage} = movieData

  return (
    <li className="movie-card-bg-container" key={id}>
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        className="poster"
        alt="poster"
      />
      <div className="movie-title-rating-container">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Rating {voteAverage}</p>
      </div>
      <Link to={`/videos/${id}`} className="btn-container">
        <button type="button" className="view-details-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
