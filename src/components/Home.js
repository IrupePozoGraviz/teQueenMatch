/* eslint-disable react/jsx-no-undef */
// login knappar = authmodal = sign in
import { React, /* useEffect, */ useState } from 'react'
import { useSelector/* , useDispatch */ } from 'react-redux';
import Nav from './Nav'
import LogIn from './login'
import { RegistrationPage } from './registration'
import Navbar from './LogedInNav'

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
      {accessToken ? (
        <Navbar /> // If the user is logged in, show the navbar
      ) : null}
      <Nav
        authToken={accessToken}
        minimal={false}
        setLogIn={setLogIn}
        Login={Login}
        setIsSignUp={setIsSignUp} />
      <div className="home">
        <h1 className="primary-title">teQueenMatch</h1>
        <p className="primary-text"> Changing tech one mentorship at a time</p>
        <button
          type="button"
          className="primary-button"
          onClick={handleClick}>
          {accessToken ? 'Sign Out' : 'Create Account'}
        </button>
        {Login && (
          <LogIn setLogIn={setLogIn} isSignUp={isSignUp}>
            {isSignUp ? <RegistrationPage /> : <LogIn />}
          </LogIn>
        )}
      </div>
    </div>
  )
}
export default Home

