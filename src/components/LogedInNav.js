/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import React from 'react';

const handleSignOut = () => {
  if (localStorage.getItem('accessToken')) {
    console.log('sign out');
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  window.location.reload();
};

const NavBar = () => {
  return (
    <nav className="logged-in-nav">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>

        <li className="navbar-item">
          <Link to="/dashboard">My Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/edit">Edit Profile</Link>
        </li>
        <li className="navbar-item">
          <Link to="/pot">Potential matches</Link>
        </li>

        <li className="navbar-item">
          <button type="button" onClick={handleSignOut}>Sign Out</button>

        </li>
      </ul>
    </nav>
  );
};
export default NavBar;