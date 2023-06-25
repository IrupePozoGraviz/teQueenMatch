/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import user from '../reducers/User';
import { API_URL } from './Utils';
import './css/createaccount.css';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (registrationSuccess) {
      // Redirect to the profile page after successful registration
      navigate('/dashboard');
    }
  }, [registrationSuccess, navigate]);

  const handlePreferenceChange = (e) => {
    const selectedPreferences = [...(e.target.selectedOptions || [])].map((option) => option.value);
    setPreferences(selectedPreferences);
  };
  const newUser = {
    username,
    password,
    email,
    firstName,
    lastName,
    role,
    preferences
  };

  const register = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };

    fetch(API_URL('register'), options)
      .then((response) => response.json())
      .then((data) => {
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
          setRegistrationSuccess(true);
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setError(data.response));
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setError('Could not register user'));
      });
  };

  return (
    <>
      <Link
        to="/"
        className="header-logo">
        <span className="hover-text">Home</span>
        <svg
          className="home-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48">
          <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z" />
        </svg>
      </Link>
      <div className="create-account">
        <h2>Registration Page</h2>
        <form onSubmit={register}>
          <div>
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <input
              type="email"
              value={email}
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>

            <input type="text" value={firstName} placeholder="name" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>

            <input type="text" value={lastName} placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>
          <div className="pref">
            <select value={preferences} onChange={handlePreferenceChange} multiple>
              <option value="">Select preferences</option>
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="react">React</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <button className="secondary-button" type="submit">Register</button>
        </form>
        {/* Redirect to the profile page */}
        {registrationSuccess && <p>Redirecting to the profile page...</p>}
      </div>
    </>
  );
};
