import { Link } from 'react-router-dom';
import React from 'react';

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
          <Link to="/">Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
