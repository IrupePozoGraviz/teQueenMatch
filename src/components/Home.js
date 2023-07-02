/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-undef */
// login knappar = authmodal = sign in
import { React, /* useEffect, */ useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Nav from './Nav'
import LogIn from './login'
import NavBarNew from './LogedInNavNew'
import './css/home.css'

const Home = () => {
  const [Login, setLogIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const accessToken = useSelector((state) => state.user.accessToken);
  // const dispatch = useDispatch();
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
    if (accessToken) {
      handleSignOut(); // Call the sign-out action if the user is already logged in
    } else {
      setLogIn(true);
      setIsSignUp(true);
    }
  };

  return (
    <div className="overlay">

      <nav>
        {accessToken ? <NavBarNew /> : null}
        {/* Wrapping the login buttons in the buttons-wrapper */}
        <div className="buttons-wrapper">
          <Nav
            authToken={accessToken}
            minimal={false}
            setLogIn={setLogIn}
            Login={Login}
            setIsSignUp={setIsSignUp} />
          {/* Only show the login form if the user clicks on "Create Account" */}
          {isSignUp ? null : Login && <LogIn isSignup={isSignUp} setLogIn={setLogIn} />}
        </div>
        <div className="headline-wrapper">
          <div className="headline">
            <h1 className="primary-title">teQueenMatch</h1>
            <img
              className="copyright-icon"
              aria-label="copywrite-icon"
              src="./assets/copyright.png"
              alt="copywrite-icon" />
          </div>

          <p className="primary-text">Changing tech one mentorship at a time</p>
          <p className="primary-text">Sign up to find your mentor or mentee</p>
        </div>
        <Link
          to="/registration"
          type="button"
          className="secondary-button"
          onClick={handleClick}>
          {accessToken ? 'Go find your match!' : 'Create Account'}
        </Link>
      </nav>
    </div>
  )
}
export default Home

