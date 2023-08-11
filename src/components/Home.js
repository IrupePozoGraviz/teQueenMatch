/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-undef */
// login knappar = authmodal = sign in
import { React, /* useEffect, */ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import LogIn from './login'
import NavBarNew from './LogedInNavNew'
import Loader from './Loader';
import { setLoading } from '../reducers/actions';
import Footer from './Footer';
import './css/home.css'

const Home = () => {
  const [Login, setLogIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const accessToken = useSelector((state) => state.user.accessToken);
  const currentUser = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSignOut = () => {
    if (localStorage.getItem('accessToken')) {
      console.log('sign out');
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.reload();
  };

  // this handleclick is not working

  const handleClick = () => {
    console.log('handleClick triggered');
    if (accessToken) {
      handleSignOut(); // Call the sign-out action if the user is already logged in
    } else {
      setLogIn(true);
      setIsSignUp(true);
    }
  };

  const handleButtonClick = () => {
    if (!accessToken) {
      dispatch(setLoading(true));

      handleClick();
      navigate('/registration'); // Navigate to the "/registration" route
      setTimeout(() => {
        dispatch(setLoading(false)); // Hide the loader
      }, 2000); // Wait for 2 seconds
    }
  };

  return (
    <div className="overlay">
      <Loader />
      {accessToken ? (
        <NavBarNew /> // If the user is logged in, show the navbar
      ) : null}
      <div className="headline-wrapper">
        <Nav
          authToken={accessToken}
          minimal={false}
          setLogIn={setLogIn}
          Login={Login}
          setIsSignUp={setIsSignUp} />

        {isSignUp ? null : Login && <LogIn isSignup={isSignUp} setLogIn={setLogIn} />}
        <button
          type="button"
          className="primary-button"
          onClick={handleButtonClick}
          disabled={accessToken ? 'disabled' : null}>
          {accessToken ? `Logged In as ${currentUser.username}` : 'Create Account'}
        </button>
        <div className="headline">
          <h1 className="primary-title">teQueenMatch</h1>
          <img
            className="copyright-icon"
            aria-label="copywrite-icon"
            src="./assets/copyright.png"
            alt="copywrite-icon" />
        </div>

        <p className="primary-text"> Changing tech one mentorship at a time</p>
        <p className="primary-text">Sign up to find your mentor or mentee</p>
      </div>
      <Footer />
    </div>

  )
}
export default Home

