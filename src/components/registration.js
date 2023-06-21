/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from '../reducers/User';
import { API_URL } from './Utils';
import AvatarSelection from './avatars';

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
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();

  const handleAvatarChange = (selectedAvatar) => {
    console.log(selectedAvatar);
    setAvatar(selectedAvatar);
  };

  useEffect(() => {
    if (registrationSuccess) {
      // Redirect to the profile page after successful registration
      navigate('/dashboard');
    }
  }, [registrationSuccess, navigate]);

  const handlePreferenceChange = (e) => {
    const selectedPreferences = Array.from(e.target.selectedOptions, (option) => option.value);
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
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={register}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>
        <div>
          <label>Preferences:</label>
          <select multiple value={preferences} onChange={handlePreferenceChange}>
            <option value="fullstack">Full Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="react">React</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          <AvatarSelection selectedAvatar={avatar} onAvatarChange={handleAvatarChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      {/* Redirect to the profile page */}
      {registrationSuccess && <p>Redirecting to the profile page...</p>}
    </div>
  );
};
