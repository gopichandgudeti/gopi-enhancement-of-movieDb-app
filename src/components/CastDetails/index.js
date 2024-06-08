import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CastDetails extends Component {
  state = {
    castDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCastDetails()
  }

  getformatedData = data => ({
    id: data.id,
    cast: data.cast.map(item => ({
      adult: item.adult,
      gender: item.gender,
      id: item.id,
      knownForDepartment: item.known_for_department,
      name: item.name,
      originalName: item.original_name,
      popularity: item.popularity,
      profilePath: item.profile_path,
      castId: item.cast_id,
      character: item.character,
      creditId: item.credit_id,
      order: item.order,
    })),
  })

  getCastDetails = async () => {
    const {theMovieId} = this.props
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://api.themoviedb.org/3/movie/${theMovieId}/credits?api_key=32cd164bcc55359e96c2633174a9359b&language=en-US`
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const formatedData = this.getformatedData(fetchedData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        castDetails: formatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <h1 className="failure-text">Not Found</h1>

  renderSuccessView = () => {
    const {castDetails} = this.state
    return (
      <ul className="casts-list-container swiper swiper-initialized swiper-horizontal swiper-pointer-events detail-castList">
        {castDetails.cast.map(each => (
          <li className="list-item-container">
            <img
              src={`https://image.tmdb.org/t/p/original${each.profilePath}`}
              className="profile-img"
              alt="profile"
            />
            <p className="actor-name">{each.name}</p>
            <p className="actor-role">{each.character}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderCastDetals = () => {
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
    return (
      <div className="cast-details-bg-container">{this.renderCastDetals()}</div>
    )
  }
}

export default CastDetails
