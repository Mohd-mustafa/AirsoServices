import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";



const Footer = () => {
  return (
    <footer className="footer-container">
    <div className="footer-content">
      {/* About Us Section */}
      <div className="footer-section about">
        <h3>About Us</h3>
        <p>
          Discover the best hotels with Airso Services. Enjoy luxury, comfort, and exclusive deals worldwide.
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Hotels</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="footer-section contact">
        <h3>Contact Us</h3>
        <p><FontAwesomeIcon icon={faEnvelope} /> support@airso.com</p>
        <p><FontAwesomeIcon icon={faPhone} /> +123 456 7890</p>
        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Main Street, City, Country</p>
      </div>

      {/* Social Media Section */}
      <div className="footer-section ">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Airso Services. All Rights Reserved.</p>
    </div>
  </footer>
    )
}

export default Footer