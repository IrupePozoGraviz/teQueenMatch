/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBarNew from './LogedInNavNew';
import { setLikedPersons } from '../reducers/User';
import placeholder from '../images/placeholder.png';
import { API_URL } from './Utils';
import './/css/potentialmatches.css';

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
      const response = await fetch(API_URL(`likedpersons/${userId}`, options)); 
      if (!response.ok) {
        throw new Error('Could not get liked persons');
      }
      const data = await response.json();
      console.log('API response:', data);
      if (data.success) {
        const likedPersons = data.response.likedPersons;
        dispatch(setLikedPersons(likedPersons));
        console.log('likedPersons:', likedPersons);
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
  console.log('likedPersons:', likedPersons); // Log likedPersons
  console.log('currentUser:', currentUser); 


  return (
    <div className="nav">
      <NavBarNew />
      <div className="header-container">
        <h1>{`Here are your liked ${
          currentUser.role === 'mentee' ? 'mentors' : 'mentees'
        }`}</h1>
      </div>
      <div className="card-container">
      {likedPersons.length === 0 ? (
        <p>No liked persons found.</p>
      ) : (
        likedPersons.map((user) => (
          <div className="person-cardfinal" key={user.username}>
            <div className="liked-card">
              <div className="photo-containerfinal">
                <img src={placeholder} alt="placeholder" />
              </div>
              <div className="profile-infofinal">
                <div className="name-containerfinal">

                <h2>{user.username} // {user.role} </h2>
              </div>
              <div className="preferences">
                <p>{user.preferences}</p>
              </div>
              <div className="bio-containerfinal">
                      <p>{user.bio}</p>
                      </div>

                      <div className="emojis">
                      <p>👩🏽‍🌾💂🏼‍♂️🧑🏻‍🎓</p>
                      </div>
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};
