import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <ul className="icons-list">
      <li className="footer-icon">
        <FaGoogle />
      </li>
      <li className="footer-icon">
        <FaTwitter />
      </li>
      <li className="footer-icon">
        <FaInstagram />
      </li>
      <li className="footer-icon">
        <FaYoutube />
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </div>
)
export default Footer
