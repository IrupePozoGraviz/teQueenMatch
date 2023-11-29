/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line import/no-named-as-default
/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from './Utils';
import { Picture } from './profilePic';
import NavBarNew from './LogedInNavNew';
import { setError, setFirstName, setLastName, setEmail, setUsername, setRole, setPreferences, setBio } from '../reducers/User';
import { setLoading } from '../reducers/actions';
import './css/edit.css'

export const EditProfilePage = () => {
  const currentUser = useSelector((store) => store.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [preferences, setPreferences] = useState([]);
  const userId = useSelector((store) => store.user.userId);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');

  // function to handle the form submit event
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
   
    const updatedUser = {
      username,
      password,
      email,
      firstName,
      lastName,
      role,
      preferences,
      bio
    };

  fetch(API_URL(`user/${currentUser.userId}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': currentUser.accessToken
    },
    body: JSON.stringify(updatedUser)
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      // Update Redux store
      dispatch(setUsername(data.response.username));
      dispatch(setFirstName(data.response.firstName));
      dispatch(setLastName(data.response.lastName));
      dispatch(setEmail(data.response.email));
      dispatch(setRole(data.response.role));
      dispatch(setPreferences(data.response.preferences));
      dispatch(setBio(data.response.bio));
      // Redirect to the profile page after successful profile update
      navigate('/profile');
    } else {
      dispatch(setError(data.message));
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    dispatch(setError('Failed to update profile'));
  })
  .finally(() => {
    dispatch(setLoading(false));
  });
};


  const handlePreferenceChange = (e) => {
    const selectedPreferences = Array.from(e.target.selectedOptions, (option) => option.value);
    setPreferences(selectedPreferences);
  };



    /* try {
      const response = await fetch(API_URL(`user/${userId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify({
          username,
          password,
          email,
          firstName,
          lastName,
          role,
          preferences
        })
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        // Redirect to the profile page after successful profile update
        navigate('/profile');
      } else {
        const error = await response.json();
        console.log('Profile update failed:', error);
      }
    } catch (error) {
      console.log('Network error:', error);
    }
  };
  */

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const response = await fetch(API_URL(`user/${userId}`), {
          method: 'DELETE',
          headers: {
            Authorization: accessToken
          }
        });

        if (response.ok) {
          console.log('Profile deleted successfully');
          // Redirect to the home page or any desired location after profile deletion
          navigate('/');
        } else {
          const error = await response.json();
          console.log('Profile deletion failed:', error);
        }
      } catch (error) {
        console.log('Network error:', error);
      }
    }
  }; 

  return (
    <>
      <NavBarNew />
      <div className="edit-container">
        <div className="header-container">
      <h2>Settings</h2>
      </div>
        <Picture className="picture-container" />
        {currentUser.error && <p className="error-message">{currentUser.error}</p>}
{currentUser.isLoading && <p>Loading...</p>}

      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="text" value={firstName} placeholder="firstname" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <input type="text" value={lastName} placeholder="lastname" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <input type="text" value={bio} placeholder="bio" onChange={(e) => setBio(e.target.value)} />
            </div>
          <div className="multiple-input-container">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>
          <div className="multiple-input-container">
            <label>Preferences:</label>
            <select multiple value={preferences} onChange={handlePreferenceChange}>
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
            
              {/* Add other preference options here */}
            </select>
          </div>
          <button className="primary-button" type="submit">Save Changes</button>
        </form>
      </section>
      <button className="secondary-button" type="submit" onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
    </>
  );
};
