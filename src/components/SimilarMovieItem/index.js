import {Link} from 'react-router-dom'
import './index.css'

const SimilarMovieItem = props => {
  const {similarMovie} = props
  const {id, posterPath, title} = similarMovie
  return (
    <li className="similar-movie-item">
      <Link to={`/movies/${id}`} key={id} target="_blank">
        <img src={posterPath} alt={title} className="similar-movie-image" />
      </Link>
    </li>
  )
}

export default SimilarMovieItem
