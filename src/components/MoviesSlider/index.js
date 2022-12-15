import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const MoviesSlider = props => {
  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 4,
  }
  const {moviesList} = props

  return (
    <>
      <Slider {...settings}>
        {moviesList.map(eachMovie => (
          <div key={eachMovie.id}>
            <img
              src={eachMovie.posterPath}
              alt="thumbnail"
              className="thumbnail"
            />
          </div>
        ))}
      </Slider>
    </>
  )
}

export default MoviesSlider
