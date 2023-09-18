import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignOutButton from './SignOut';
import './css/topNavBar.css';

const TopNavBar = () => {
  const currentUser = useSelector((store) => store.user);

  return (
    <div className="top-bar-container">

      {currentUser.accessToken ? (
        <SignOutButton />
      ) : (
        <Link to="/login" className="login-button">
          Log In
        </Link>
      )}
    </div>
  );
};

export default TopNavBar;