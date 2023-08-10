import React from 'react';
import { Link } from 'react-router-dom';
import './css/topNavBar.css';

const TopNavBar = () => {
  return (
    <div className="top-nav-bar">
      <Link
        to="/"
        className="home-button">Home
      </Link>
      <Link
        to="/about"
        className="about-button">About
      </Link>
      <Link
        to="/contact"
        className="contact-button">Contact
      </Link>

    </div>
  );
};

export default TopNavBar;