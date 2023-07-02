/* eslint-disable max-len */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav-style.css';

// this const is a functional component that takes in props and returns a nav bar with a logo and a login button if we're not logged in. It also sets up an event handler for the login button that sets the show modal state to true and the is sign up state to false

const Nav = ({ authToken, setLogIn, Login, setIsSignUp }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (authToken) {
      navigate('/');
    } else {
      setLogIn(true);
      setIsSignUp(false);
    }
  };

  return (
    <div className="login-wrapper">
      {authToken ? ( // if we have an auth token, show the sign out button, else show the login button
        <button
          className="secondary-button"
          type="button"
          onClick={handleClick}>
          <Link
            to="/">
              Sign Out
          </Link>
        </button>

      ) : (
        <button
          className="secondary-button"
          type="button"
          onClick={handleClick}
          disabled={Login}>
          <Link
            to="/">
            Login
          </Link>
        </button>
      )}
      <button
        type="button"
        className="secondary-button">
        <Link
          to="/tinder-cards">Prototype
        </Link>
      </button>
    </div>
  );
};
export default Nav;