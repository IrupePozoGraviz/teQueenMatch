import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignOutButton from './SignOut';
import './css/topNavBar.css';

const TopNavBar = () => {
  const currentUser = useSelector((store) => store.user);

  return (
    <div className="top-bar-container">
      <Link
        to="/"
        className="home-button">Home
      </Link>
      {currentUser.accessToken ? (
        <SignOutButton /> // Render SignOutButton for logged-in user
      ) : (
        <Link to="/login" className="login-button">
          Log In
        </Link> // Render Log In link for logged-out user
      )}
    </div>
  );
};

export default TopNavBar;