/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import user from '../reducers/User'
import { API_URL } from './Utils'
import { RegistrationPage } from './registration'
import Loader from './Loader'
import './css/login.css'

const LogIn = ({ setLogIn, isSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector((store) => store.user.error);
  const login = 'login';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  const handleClick = () => {
    setLogIn(false)
    console.log('clicked')
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/pot');
    }
  }, [accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log('isloading', isLoading);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };
    fetch(API_URL(login), options)
      .then((response) => response.json())
      .then((data) => {
        console.log('Login Data:', data);
        setIsLoading(false);
        if (data.success) {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response._id));
          dispatch(user.actions.setRole(data.response.role));
          dispatch(user.actions.setFirstName(data.response.firstName));
          dispatch(user.actions.setLastName(data.response.lastName));
          dispatch(user.actions.setEmail(data.response.email));
          dispatch(user.actions.setPreferences(data.response.preferences));
          dispatch(user.actions.setError(null));
          dispatch(user.actions.setAccessToken(data.response.accessToken));
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setError(data.response))
        }
      });
  };

  return (
    <div className="auth-modal">
      {isLoading && <Loader />}
      <div className="close-icon" onClick={handleClick}>ⓧ</div>
      {!isSignUp && (
        <>
          <h2>LOG IN</h2>
          <p className="cookie-text">By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
          <form onSubmit={handleSubmit}>
            <input
              className="username"
              type="text"
              id="Username"
              name="Username"
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)} />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)} />
            <div className="loginbtn">
              <input className="secondary-button" type="submit" />
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </>)}
      {isSignUp && (
        <RegistrationPage />
      )}
    </div>
  )
}
export default LogIn