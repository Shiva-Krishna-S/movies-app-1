import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchPage extends Component {
  state = {
    searchInput: '',
    searchMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  getSearchResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
      }))
      this.setState({
        searchMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchMovies = value => {
    this.setState({searchInput: value}, this.getSearchResults)
  }

  onTryAgain = () => {
    this.getSearchResults()
  }

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderNoMoviesFound = () => {
    const {searchInput} = this.state
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671028483/Group_7394Search_No_Results_ylyxxy.png"
          alt="no movies"
          className="failure-image"
        />
        <p className="failure-msg">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchMovies} = this.state
    return (
      <div className="status-bg-container">
        {searchMovies.length > 0 ? (
          <div>
            <div>
              <ul className="popular-movie-list">
                {searchMovies.map(eachMovie => (
                  <li key={eachMovie.id} className="popular-movie-item">
                    <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
                      <img
                        src={eachMovie.posterPath}
                        alt={eachMovie.title}
                        className="popular-movie-image"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          this.renderNoMoviesFound()
        )}
      </div>
    )
  }

  renderSearchedMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
      <div className="popular-background">
        <Header searchMovies={this.searchMovies} />
        {this.renderSearchedMovies()}
      </div>
    )
  }
}

export default SearchPage
