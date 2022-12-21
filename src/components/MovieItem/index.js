import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {title, adult, runtime, releaseDate, overview} = movieDetails

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  return (
    <div className="movie-heading-container">
      <h1 className="movie-name">{title}</h1>
      <div className="movie-details">
        <p className="duration">{`${hours}h ${minutes}m `}</p>
        <p className="certificate">{adult ? 'A' : 'U/A'}</p>
        <p className="duration">{year}</p>
      </div>
      <p className="movie-description">{overview}</p>
      <button type="button" className="play-btn">
        Play
      </button>
    </div>
  )
}

export default MovieItem
