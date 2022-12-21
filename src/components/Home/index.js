import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MoviesSlider from '../MoviesSlider'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    trendingMoviesList: [],
    originalsList: [],
    trendingMoviesApiStatus: apiStatusConstants.initial,
    originalsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getOriginals()
  }

  getTrendingMovies = async () => {
    this.setState({trendingMoviesApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedTrendingData = fetchedData.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        name: eachMovie.title,
      }))
      this.setState({
        trendingMoviesList: updatedTrendingData,
        trendingMoviesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingMoviesApiStatus: apiStatusConstants.failure})
    }
  }

  onTrendingTryAgain = () => {
    this.getTrendingMovies()
  }

  renderTrendingFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671379818/alert-trianglefailure_view_bdhscp.png"
        alt="failure view"
        className="failure-home-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.onTrendingTryAgain}
        className="failure-retry-button"
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingMoviesListView = () => {
    const {trendingMoviesList} = this.state

    return <MoviesSlider moviesList={trendingMoviesList} />
  }

  renderTrendingMovies = () => {
    const {trendingMoviesApiStatus} = this.state

    switch (trendingMoviesApiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingMoviesListView()
      case apiStatusConstants.failure:
        return this.renderTrendingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getOriginals = async () => {
    this.setState({originalsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedOriginalsData = fetchedData.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        name: eachMovie.title,
      }))
      this.setState({
        originalsList: updatedOriginalsData,
        originalsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({originalsApiStatus: apiStatusConstants.failure})
    }
  }

  onOriginalsTryAgain = () => {
    this.getOriginals()
  }

  renderOriginalsFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671379818/alert-trianglefailure_view_bdhscp.png"
        alt="failure view"
        className="failure-home-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.onOriginalsTryAgain}
        className="failure-retry-button"
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalsListView = () => {
    const {originalsList} = this.state

    return <MoviesSlider moviesList={originalsList} />
  }

  renderOriginals = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalsListView()
      case apiStatusConstants.failure:
        return this.renderOriginalsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" className="loader" />
    </div>
  )

  renderRandomMovieContainer = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case apiStatusConstants.success:
        return this.renderRandomMovie()
      case apiStatusConstants.failure:
        return this.renderRandomFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRandomMovie = () => {
    const {originalsList} = this.state
    const randomMovie =
      originalsList[Math.floor(Math.random() * originalsList.length)]
    const {name, overview, backdropPath} = randomMovie

    return (
      <div
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          height: '100%',
        }}
      >
        <Header />
        <div className="random-movie-container">
          <h1 className="random-movie-title">{name}</h1>
          <p className="random-movie-desc">{overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  onFailureTryAgain = () => {
    this.getOriginals()
  }

  renderRandomFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671379818/alert-trianglefailure_view_bdhscp.png"
        alt="failure view"
        className="failure-home-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.onFailureTryAgain}
        className="failure-retry-button"
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {originalsApiStatus} = this.state
    return (
      <div className="home-background-container">
        {originalsApiStatus !== 'SUCCESS' && <Header />}
        {this.renderRandomMovieContainer()}
        <h1 className="movies-heading">Trending Now</h1>
        {this.renderTrendingMovies()}
        <h1 className="movies-heading">Originals</h1>
        {this.renderOriginals()}
        <Footer />
      </div>
    )
  }
}

export default Home
