import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  //   const username = Cookies.get('userName')
  //   const password = Cookies.get('passWord')
  //   const maskedPassword = '*'.repeat(password.length)

  return (
    <div className="account-background-container">
      <Header />
      <div className="account-container">
        <div className="account-details-container">
          <h1 className="account-heading">Account</h1>
          <hr className="separator" />
          <div className="member-container">
            <p className="membership-head">Member ship</p>
            <div className="account-details-list">
              <p className="username">user@gmail.com</p>
              <p className="password">Password : ***********</p>
            </div>
          </div>
          <hr className="separator" />
          <div className="plan-details">
            <p className="plan-head">Plan details</p>
            <p className="user">Premium</p>
            <p className="premium-quality">Ultra HD</p>
          </div>
          <hr className="separator" />
        </div>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Account
