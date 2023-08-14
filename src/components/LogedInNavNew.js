/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LogedInNavStyleNew.css';
import SignOutButton from './SignOut';

const NavBarNew = ({ navOne, navTwo, navThree, navFour, navFive, navSix }) => { // navOne, navTwo, navThree, navFour, navFive are the names of the links in the nav bar that are passed in as props from the dashboard page (see Dashboard.js) and can be renamed to whatever you want. the purpurse of this is to make the nav bar reusable for other pages that need a nav bar with different links in it.
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const currentUser = useSelector((store) => store.user);
  // this useEffect is for the menu to close when you click outside of it or scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]); // [isOpen is for the menu to close when you click outside of it or scroll]

  return (
    <nav
      className="styled-nav-bar">
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
      <Link
        to="/"
        className="home-button">Home
      </Link>

      <div
        className={`menu-nav ${isOpen ? 'open' : ''}`}
        ref={navRef}>
        <ul className="ul-elements">
          <li className="li-elements">
            <Link to="/">Home</Link>
          </li>
          <li className="li-elements">
            <Link to="/dashboard">{navOne}Dashboard</Link>
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
      <div className="profile-container">
        <p>Signed in as</p>
        <h1 className="user-name">{currentUser.username}</h1>
        <p className="role">{currentUser.role}</p>
        <SignOutButton />
      </div>
    </nav>
  );
};

export default NavBarNew;