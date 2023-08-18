import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import './css/topNavBar.css';

const TopNavBar = () => {
  return (
    <div className="top-bar-container">
      <Link
        to="/"
        className="home-button">Home
      </Link>
      <SignOutButton />
    </div>
  );
};

export default TopNavBar;