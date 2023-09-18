/* eslint-disable max-len */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Nav-style.css';

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
      {authToken ? (
        null

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
    </div>
  );
};
export default Nav;