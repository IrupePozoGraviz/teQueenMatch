/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LogedInNavStyleNew.css';
import SignOutButton from './SignOut';

const NavBarNew = ({ navOne, navTwo, navThree, navFour, navFive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  // this useEffect is for the menu to close when you click outside of it or scroll
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleScroll = () => {
      setIsOpen(false);
    };
    // this is for the menu to close when you click outside of it or scroll
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]); // [isOpen is for the menu to close when you click outside of it or scroll]
  /*
  const handleSignOut = () => {
    if (localStorage.getItem('accessToken')) {
      console.log('sign out');
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.reload();
  }; */

  return (
    <nav
      className="styled-nav-bar">
      <Link
        to="/"
        className="header-logo">
        <span className="hover-text">Home</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
          <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z" />
        </svg>
        <SignOutButton />
      </Link>
      <button
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <img src={`${process.env.PUBLIC_URL}/assets/Hamburger_icon.png`} alt="Hamburger Icon" className="hamburger-icon" />
        ) : (
          'Menu'
        )}
      </button>
      <div
        className={`menu-nav ${isOpen ? 'open' : ''}`}
        ref={navRef}>
        <ul className="ul-elements">
          <li className="li-elements">
            <Link to="/dashboard">{navOne}My dashboard</Link>
          </li>
          <li className="li-elements">
            <Link to="/edit">{navTwo}Edit Profile</Link>
          </li>
          <li className="li-elements">
            <Link to="/pot">{navThree}Potential Matches</Link>
          </li>
          <li className="li-elements">
            <Link to="/">{navFour}</Link>
          </li>
          <li className="li-elements">
            <Link to="/">{navFive}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarNew;
