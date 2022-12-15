import {BsSearch} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="navbar-container">
    <div className="logo-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671029878/Group_7399movies_logo_s93l3x.png"
          alt="website logo"
        />
      </Link>
      <ul className="routes-container">
        <Link to="/">
          <li className="route-item">Home</li>
        </Link>
        <Link to="/popular">
          <li className="route-item">Popular</li>
        </Link>
      </ul>
    </div>
    <div>
      <BsSearch />
      <img
        src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671028482/Avatarmale_avatar_1_dnfdgg.png"
        alt="profile"
      />
    </div>
  </nav>
)

export default withRouter(Header)
