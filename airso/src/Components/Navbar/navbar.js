import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import airso from '../../assests/airso.jpg'; // Update path accordingly
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContextFiles/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth()

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>
        <div className="logo">
          <img src={airso} alt="Logo" />
        </div>
        <ul className={`nav-links ${menuOpen ? "" : "active"}`}>
        <li className="nav-item">
        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
        </li>
        <li className="nav-item dropdown" onClick={() => toggleDropdown(1)}>
  Visa Services
  <div className={`submenu ${dropdownOpen === 1 ? "open" : ""}`}>
    <Link to="/tourist-visa" className="submenu-item">Tourist Visa</Link>
    <Link to="/tourist-visa" className="submenu-item">Business Visa</Link>
    <Link to="/tourist-visa" className="submenu-item">E-Tourist Visa</Link>
    <Link to="/tourist-visa" className="submenu-item">E-Business Visa</Link>
    <Link to="/tourist-visa" className="submenu-item">Umrah Visa</Link>
  </div>
</li>
          <li className="nav-item dropdown" onClick={() => toggleDropdown(2)}>
            Passport Services
            <div className={`submenu ${dropdownOpen === 2 ? "open" : ""}`}>
              <span className="submenu-item dropdown">New Passport</span>
              <div className="submenu-content">
                <span className="submenu-option">Normal Passport</span>
                <span className="submenu-option">Tatkal Passport</span>
              </div>
              <span className="submenu-item">Renewal Passport</span>
              <span className="submenu-item">Indian Passport</span>
              <span className="submenu-item">USA Passport</span>
            </div>
          </li>
          <li className="nav-item dropdown" onClick={() => toggleDropdown(3)}>
            Umrah & Hajj
            <div className={`submenu ${dropdownOpen === 3 ? "open" : ""}`}>
              <span className="submenu-item">Economy Umrah Package</span>
              <span className="submenu-item">Premium Umrah Package</span>
              <span className="submenu-item">Deluxe Umrah Package</span>
              <span className="submenu-item">Customize as per requirement</span>
            </div>
          </li>
          <li className="nav-item dropdown" onClick={() => toggleDropdown(4)}>
            OCI Services
            <div className={`submenu ${dropdownOpen === 4 ? "open" : ""}`}>
              <span className="submenu-item">New OCI Card</span>
              <span className="submenu-item">Update OCI Card</span>
            </div>
          </li>
          <li className="nav-item">Renunciation Services</li>
          <li className="nav-item dropdown" onClick={() => toggleDropdown(5)}>
            Flights
            <div className={`submenu ${dropdownOpen === 5 ? "open" : ""}`}>
              <span className="submenu-item">Domestic Flight</span>
              <span className="submenu-item">International Flight</span>
            </div>
          </li>
          <li className="nav-item"><Link to="/contact">Contact Us</Link></li>
          {isAuthenticated ? (
            <>
              <li><button onClick={logout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )
          }
        </ul>
        <div className="phone-contact-number">
          <p>Call Us now</p>
          <h3>8801626403</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
