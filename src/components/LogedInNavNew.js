/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNavBar from './TopNavBar';
import './css/LogedInNavStyleNew.css';

const NavBarNew = ({ navOne, navTwo, navThree, navFour, navFive, navSix }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const currentUser = useSelector((store) => store.user);
  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <nav
      className="styled-nav-bar">
      <div className="hamburger-container">
        <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <img
              src={`${process.env.PUBLIC_URL}/assets/close.png`}
              alt="Close Icon"
              className="close-icon" />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/assets/Hamburger_icon.png`}
              alt="Hamburger Icon"
              className="hamburger-icon" />
          )}
        </button>
      </div>
      <TopNavBar />
      <div
        className={`menu-nav ${isOpen ? 'open' : ''}`}
        ref={navRef}>
        <ul className="ul-elements">
          <li className="li-elements">
            <Link to="/matches">{navOne}Matches</Link>
          </li>
          <li className="li-elements">
            <Link to="/edit">{navTwo}Edit Profile</Link>
          </li>
          <li className="li-elements">
            <Link to="/pot">{navThree}Potential Matches</Link>
          </li>
          <li className="li-elements">
            <Link to="/liked">{navFour}Liked</Link>
          </li>
          <li className="li-elements">
            <Link to="/tinder-cards">{navFive}Prototype</Link>
          </li>
          <li className="li-elements">
            <Link to="/">{navSix}</Link>
          </li>
        </ul>
      </div>
      {currentUser.accessToken ? (
        <div className="profile-container">
          <p>Signed in as</p>
          <h1 className="user-name">{currentUser.username}</h1>
          <p className="role">{currentUser.role}</p>
        </div>
      ) : (
        <div className="profile-container">
          <p>Signed out</p>
        </div>
      )}

    </nav>
  );
};

export default NavBarNew;