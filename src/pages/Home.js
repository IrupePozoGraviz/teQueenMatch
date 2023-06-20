/* eslint-disable react/jsx-no-undef */
// login knappar = authmodal = sign in
import { React, useState } from 'react'
// import { useCookies } from 'react-cookie' // install by running npm install react-cookie
import { useSelector } from 'react-redux';
import Nav from '../components/Nav'
import LogIn from '../components/login'
import { RegistrationPage } from '../components/registration'

const Home = () => {
  const [Login, setLogIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const accessToken = useSelector((state) => state.user.accessToken);

  const handleClick = () => {
    if (accessToken) {
      window.location.reload()
      return
    }
    setLogIn(true)
    setIsSignUp(true)
  }

  return (
    <div className="overlay">
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
          {accessToken ? 'Signout' : 'Create Account'}
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