/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import React from 'react';
import './LogedInNavStyle.css';

<<<<<<< HEAD
const handleSignOut = () => {
  if (localStorage.getItem('accessToken')) {
    console.log('sign out');
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  window.location.reload();
};

=======
>>>>>>> master
const NavBar = () => {
  return (
    <nav
      className="logged-in-nav">
      <ul
        className="navbar-list">
        <li
          className="navbar-item">
          <Link to="/">Home</Link>
        </li>

        <li
          className="navbar-item">
          <Link to="/dashboard">My Dashboard</Link>
        </li>
        <li
          className="navbar-item">
          <Link to="/edit">Edit Profile</Link>
        </li>
        <li
          className="navbar-item">
          <Link to="/pot">Potential matches</Link>
        </li>

<<<<<<< HEAD
        <li className="sign-out-btn">
          <button
            type="button"
            onClick={handleSignOut}>
            {localStorage.getItem('accessToken') ? (
              <Link to="/">Sign Out</Link>
            ) : (<Link to="/">Sign In</Link>)}
          </button>
          {}

=======
        <li className="navbar-item">
          <Link to="/">Sign Out</Link>
>>>>>>> master
        </li>
      </ul>
    </nav>
  );
};
<<<<<<< HEAD
export default NavBar;
=======
export default NavBar;
>>>>>>> master
