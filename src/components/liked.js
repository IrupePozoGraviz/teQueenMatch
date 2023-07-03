/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
// code is showing but dislike and like logic not working

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBarNew from './LogedInNavNew';
import { setLikedPersons } from '../reducers/User';
import placeholder from '../images/placeholder.png';

export const Liked = () => {
  const likedPersons = useSelector((store) => store.user.likedPersons);
  const userId = useSelector((store) => store.user.userId);
  const currentUser = useSelector((store) => store.user);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  const fetchLikedPersons = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      };
      const response = await fetch(`/likedpersons/${userId}`, options);
      if (!response.ok) {
        throw new Error('Could not get liked persons');
      }
      const data = await response.json();
      console.log('API response:', data);
      if (data.success) {
        const likedPersons = data.response.likedPersons; // Access 'likedPersons' from the response object
        dispatch(setLikedPersons(likedPersons));
      } else {
        throw new Error('API request unsuccessful');
      }
    } catch (error) {
      console.error(error);
      // Handle the error state or display an error message to the user
    }
  };

  useEffect(() => {
    fetchLikedPersons();
  }, []);

  const filteredLikedPersons = likedPersons
    ? likedPersons.filter(
        (user) =>
          !user.likedPersons.includes(user.Id) &&
          !user.dislikedPersons.includes(user.Id)
      )
    : [];

  return (
    <div className="nav">
      <NavBarNew />
      <div className="header-container">
        <h1>{`Here are your liked ${
          currentUser.role === 'mentee' ? 'mentors' : 'mentees'
        }`}</h1>
      </div>
      {filteredLikedPersons.length === 0 ? (
        <p>No liked persons found.</p>
      ) : (
        filteredLikedPersons.map((user) => (
          <div className="liked-container" key={user._id}>
            <div className="liked-card">
              <div className="liked-card-image">
                <img src={placeholder} alt="placeholder" />
              </div>
              <div className="liked-card-text">
                <h2>{user.username}</h2>
                <p>{user.role}</p>
                <p>Preferences: </p>
                {user.preferences.map((pref, index) => (
                  <p key={index}>{pref}</p>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
