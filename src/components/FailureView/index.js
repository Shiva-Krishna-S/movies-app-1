import Header from '../Header'
import './index.css'

const FailureView = props => {
  const {onTryAgain} = props
  const onClickTryAgain = () => {
    onTryAgain()
  }
  return (
    <>
      <Header />
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671028483/Background-CompleteSomething_went_wrong_lpwr8q.png"
          alt="failure view"
          className="failure-view-image"
        />
        <p className="failure-msg">Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={onClickTryAgain}
          className='className="try-again-btn"'
        >
          Try Again
        </button>
      </div>
    </>
  )
}

export default FailureView
