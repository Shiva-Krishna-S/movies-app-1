import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdOutlineMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
    searchPath: '',
    showMenuTabs: false,
  }

  componentDidMount() {
    this.setState({searchPath: window.location.pathname})
  }

  onClickMenuBar = () => {
    this.setState({showMenuTabs: true})
  }

  onClickCloseIcon = () => {
    this.setState({showMenuTabs: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    const {searchMovies} = this.props
    // if (searchInput.length !== 0) {
    //   searchMovies(searchInput)
    // }
    searchMovies(searchInput)
  }

  onSearchEnter = event => {
    const {searchInput} = this.state
    const {searchMovies} = this.props
    // if (event.key === 'Enter' && searchInput.length !== 0) {
    //   searchMovies(searchInput)
    // }
    if (event.key === 'Enter') {
      searchMovies(searchInput)
    }
  }

  render() {
    const {searchPath, showMenuTabs, searchInput} = this.state

    const showSearchInput = searchPath === '/search'

    const homeTabClassName = searchPath === '/' ? 'active' : null
    const popularTabClassName = searchPath === '/popular' ? 'active' : null
    const accountTabClassName = searchPath === '/account' ? 'active' : null

    return (
      <nav className="nav-main-container">
        <div className="nav-bar-container">
          <div className="logo-category-container">
            <Link to="/" className="tab-link">
              <img
                src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671029878/Group_7399movies_logo_s93l3x.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <ul className="category">
              <Link to="/" className="tab-link">
                <li className={`route-tab ${homeTabClassName}`}>Home</li>
              </Link>
              <Link to="/popular" className="tab-link">
                <li className={`route-tab ${popularTabClassName}`}>Popular</li>
              </Link>
            </ul>
          </div>
          <div className="image-icons-container">
            {showSearchInput ? (
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onKeyDown={this.onSearchEnter}
                  onChange={this.onChangeSearchInput}
                  className="search-bar"
                />
                <button
                  type="button"
                  onClick={this.onClickSearchIcon}
                  testid="searchButton"
                  className="enter-btn"
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </div>
            ) : (
              <Link to="/search" className="tab-link">
                <button
                  type="button"
                  testid="searchButton"
                  className="search-btn"
                >
                  <HiOutlineSearch size={25} className="search-icon-btn" />
                </button>
              </Link>
            )}
            <button
              type="button"
              onClick={this.onClickMenuBar}
              className="hamburger-btn"
            >
              <MdOutlineMenuOpen className="hamburger-icon" />
            </button>
            <div className="profile-container">
              <Link to="/account" className="tab-link">
                <img
                  src="https://res.cloudinary.com/df8n5yti7/image/upload/v1671028482/Avatarmale_avatar_1_dnfdgg.png"
                  alt="profile"
                  className="profile-image"
                />
              </Link>
            </div>
          </div>
        </div>
        {showMenuTabs && (
          <ul className="category-list">
            <Link to="/" className="tab-link">
              <li className={`route-tab ${homeTabClassName} category-item`}>
                Home
              </li>
            </Link>
            <Link to="/popular" className="tab-link">
              <li className={`route-tab ${popularTabClassName} category-item`}>
                Popular
              </li>
            </Link>
            <Link to="/account" className="tab-link">
              <li className={`route-tab ${accountTabClassName} category-item`}>
                Account
              </li>
            </Link>
            <li className="tab-link">
              <button
                type="button"
                onClick={this.onClickCloseIcon}
                className="close-btn"
              >
                <AiFillCloseCircle size={20} color="#ffffff" />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default Header
