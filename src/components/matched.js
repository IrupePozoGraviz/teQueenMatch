/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
// code is showing but dislike and like logic not working
/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
// code is showing but dislike and like logic not working
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from './Utils';
import { setMatchedPersons } from '../reducers/User';
import NavBarNew from './LogedInNavNew';
import placeholder from '../images/placeholder.png';
import './/css/potentialmatches.css';

export const Matched = () => {
  const matchedPersons = useSelector((store) => store.user.matchedPersons);
  const userId = useSelector((store) => store.user.userId);
  const currentUser = useSelector((store) => store.user);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  const matchedUsers = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      };

      const response = await fetch(API_URL(`matchedPersons/${userId}`), options);
      const data = await response.json();

      console.log('API response:', data);

      if (data.success) {
        const matchedPersonsData = data.matchedPersons;
        dispatch(setMatchedPersons(matchedPersonsData));
        console.log(matchedPersonsData);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  // Call the function to fetch and display the matched persons
  useEffect(() => {
    matchedUsers();
  }, []);

  console.log('matchedPersons:', matchedPersons);
  console.log(currentUser);

  return (
    <div className="potential-matches">
      <NavBarNew />
      <div className="potential-matches-container">
        <h1>Matched</h1>
        <div className="potential-matches-list">
          {matchedPersons.map((user) => (
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
                  <div className="emojis">
                    <p>👩🏽‍🌾💂🏼‍♂️🧑🏻‍🎓</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
