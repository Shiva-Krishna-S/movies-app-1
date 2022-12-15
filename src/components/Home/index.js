import {Component} from 'react'
import Cookies from 'js-cookie'
import {GoAlert} from 'react-icons/go'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MoviesSlider from '../MoviesSlider'

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
      const updatedData = fetchedData.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        trendingMoviesList: updatedData,
        trendingMoviesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingMoviesApiStatus: apiStatusConstants.failure})
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
      const updatedData = fetchedData.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        originalsList: updatedData,
        originalsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({originalsApiStatus: apiStatusConstants.failure})
    }
  }

  renderTrendingMoviesListView = () => {
    const {trendingMoviesList} = this.state

    return (
      <>
        <MoviesSlider moviesList={trendingMoviesList} />
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <GoAlert />
      <h1>Something went wrong. Please try again</h1>
      <button type="button">Try Again</button>
    </div>
  )

  renderLoadingView = () => (
    <div>
      <Loader type="Rings" color="#D81F26" height="50" width="50" />
    </div>
  )

  renderTrendingMovies = () => {
    const {trendingMoviesApiStatus} = this.state

    switch (trendingMoviesApiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingMoviesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginalsListView = () => {
    const {originalsList} = this.state

    return (
      <>
        <MoviesSlider moviesList={originalsList} />
      </>
    )
  }

  renderOriginals = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRandomMovieContainer = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case apiStatusConstants.success:
        return this.renderRandomMovie()
      case apiStatusConstants.failure:
        return this.renderFailureView()
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
    const {title, overview, posterPath} = randomMovie

    return (
      <div
        style={{backgroundImage: `url(${posterPath})`}}
        className="random-movie-container"
      >
        <h1>{title}</h1>
        <p>{overview}</p>
        <button type="button">Play</button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.renderRandomMovieContainer()}
        <div className="home-sub-section">
          <div className="movies-container">
            <h1 className="movies-heading">Trending Now</h1>
            {this.renderTrendingMovies()}
            <h1 className="movies-heading">Originals</h1>
            {this.renderOriginals()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
