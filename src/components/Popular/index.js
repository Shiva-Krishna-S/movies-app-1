import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        popularMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div>
      <Loader type="Rings" color="#D81F26" height="50" width="50" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMoviesList} = this.state

    return (
      <ul className="popular-movies-container">
        {popularMoviesList.map(eachMovie => (
          <li className="popular-movie-item">
            <img
              src={eachMovie.posterPath}
              alt={eachMovie.title}
              key={eachMovie.id}
              className="popular-image"
            />
          </li>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671028483/Background-CompleteSomething_went_wrong_lpwr8q.png"
        alt="movies failure"
      />
      <h1>Something went wrong. Please try again</h1>
      <button type="button">Try Again</button>
    </div>
  )

  renderPopularMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularMoviesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPopularMovies()}
      </>
    )
  }
}

export default Popular
