import {Component} from 'react'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Header from '../Header'
import FailureView from '../FailureView'
import MovieItem from '../MovieItem'
import SimilarMovieItem from '../SimilarMovieItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: {},
    genres: [],
    similarMovies: [],
    spokenLanguages: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const fetchedObject = fetchedData.movie_details
      const updatedData = {
        adult: fetchedObject.adult,
        backdropPath: fetchedObject.backdrop_path,
        budget: fetchedObject.budget,
        genres: fetchedObject.genres,
        id: fetchedObject.id,
        overview: fetchedObject.overview,
        posterPath: fetchedObject.poster_path,
        releaseDate: fetchedObject.release_date,
        runtime: fetchedObject.runtime,
        similarMovies: fetchedObject.similar_movies,
        spokenLanguages: fetchedObject.spoken_languages,
        title: fetchedObject.title,
        voteAverage: fetchedObject.vote_average,
        voteCount: fetchedObject.vote_count,
      }
      //   console.log(updatedData)
      const genresList = updatedData.genres
      //   console.log(genresList)
      const similarMoviesList = updatedData.similarMovies.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        posterPath: eachMovie.poster_path,
        id: eachMovie.id,
        title: eachMovie.title,
        overview: eachMovie.overview,
      }))
      //   console.log(similarMoviesList)
      const spokenLanguagesList = updatedData.spokenLanguages.map(eachLang => ({
        englishName: eachLang.english_name,
        id: eachLang.id,
      }))
      //   console.log(spokenLanguagesList)

      this.setState({
        movieDetails: updatedData,
        apiStatus: apiStatusConstants.success,
        genres: genresList,
        similarMovies: similarMoviesList.slice(0, 6),
        spokenLanguages: spokenLanguagesList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onTryAgain = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderSuccessView = () => {
    const {movieDetails, genres, similarMovies, spokenLanguages} = this.state
    const {budget, releaseDate, voteAverage, voteCount} = movieDetails
    const formattedDate = format(new Date(releaseDate), 'do MMMM yyyy')
    return (
      <div className="movie-item-container">
        <div
          style={{
            backgroundImage: `url(${movieDetails.backdropPath})`,
            backgroundSize: '100% 100%',
            height: '100%',
          }}
        >
          <Header />
          <MovieItem movieDetails={movieDetails} key={movieDetails.id} />
        </div>
        <div className="details-background">
          <div className="movie-details-section">
            <ul className="each-genre-ul-container">
              <h1 className="movie-info-genre-heading">Genres</h1>
              {genres.map(eachGenre => (
                <li key={eachGenre.id} className="movie-info-each-genre">
                  <p>{eachGenre.name}</p>
                </li>
              ))}
            </ul>
            <ul className="each-genre-ul-container">
              <h1 className="movie-info-genre-heading">Audio Available</h1>
              {spokenLanguages.map(eachAudio => (
                <li key={eachAudio.id} className="movie-info-each-genre">
                  <p>{eachAudio.englishName}</p>
                </li>
              ))}
            </ul>
            <div className="each-genre-ul-container">
              <h1 className="movie-info-rating-count-heading">Rating Count</h1>
              <p className="movie-info-rating-count">{voteCount}</p>
              <h1 className="movie-info-rating-avg-heading">Rating Average</h1>
              <p className="movie-info-rating">{voteAverage}</p>
            </div>
            <div className="each-genre-ul-container">
              <h1 className="movie-info-budget-heading">Budget</h1>
              <p className="movie-info-budget">{budget}</p>

              <h1 className="movie-info-release-date">Release Date </h1>
              <p className="movie-info-budget">{formattedDate}</p>
            </div>
          </div>
          <h1 className="more-like-this">More like this</h1>
          <ul className="similar-ul-container">
            {similarMovies.map(similarMovie => (
              <SimilarMovieItem
                similarMovie={similarMovie}
                key={similarMovie.id}
              />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderMovieDetails = () => {
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
      <>
        <div className="movie-details-bg-container">
          {this.renderMovieDetails()}
        </div>
      </>
    )
  }
}

export default MovieItemDetails
