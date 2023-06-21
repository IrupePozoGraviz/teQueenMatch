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
import { setError } from '../reducers/User';
import NavBar from './LogedInNav';
import './cards.css';


export const Potential = () => {
  const [matchingList, setMatchingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  const userId = useSelector((store) => store.user.userId);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');
  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };

        const response = await fetch(API_URL('/users'), options);
        const data = await response.json();

        if (data.success) {
          let filteredUsers = data.response.users;

          if (currentUser.role === 'mentor') {
            filteredUsers = data.response.users.filter(
              (user) => user.role === 'mentee'
            );
          } else {
            filteredUsers = data.response.users.filter(
              (user) => user.role === 'mentor'
            );
          }

          setMatchingList(filteredUsers);
          dispatch(setError(null));
        } else {
          dispatch(setError('Failed to fetch user profile.'));
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUsers();
    }
  }, [dispatch, accessToken, userId]);

  /* const swiped = (direction, likePersonUserId) => {
  if (direction === 'right') {
    handleLikePerson(likePersonUserId);
  } else if (direction === 'left') {
    setDislikedUsers(prevDislikedUsers => [...prevDislikedUsers, likePersonUserId]);
  }
  setLastDirection(direction);
  }; */
  
  //"path": "/likedPersons/:userId",

  const handleLikePerson = (user) => {
    const likePersonUserId = user._id;
    console.log('likePersonUserId', likePersonUserId); // Log the likePersonUserId
    console.log('API URL:', API_URL(`likedPersons/${userId}`)); 
    fetch(API_URL(`likedPersons/${userId}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        likedUserId: likePersonUserId
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('Response:', json); // Log the response data
        if (json.accessToken) {
          setLikedUsers(json.likedPersons);
        } else if (json.error) {
          console.error('API error:', json.error); // Log the specific error message
        } else {
          console.error('Failed to save liked person');
        }
      })
      .catch((error) => {
        console.error('Error:', error); // Log the entire error object
      });
  };
  

  const filteredMatchingList = matchingList.filter(
    (user) =>
      !likedUsers.includes(user.id) && !dislikedUsers.includes(user.id)
  );
console.log('filteredMatchingList', filteredMatchingList);
  return (
    <div className="nav">
      <NavBar />
      <main className="dashboard">
        <div className="box-container">
          <div className="profile-header">
            <h1>{`${currentUser.username}, here are your potential mentors/mentees`}</h1>
            <p>{`Your role: ${currentUser.role}`}</p>
          </div>
          {loading ? (
            'Loading...'
          ) : (
            <div>
              {filteredMatchingList.length === 0 ? (
                <p>No more potential matches available.</p>
              ) : (
                filteredMatchingList.map((user) => (
                  <div
                    className="person-cardfinal"
                    key={user.username}
                  >
                        <div className="photo-containerfinal">
                          <img
                            src={user.profilePic}
                            alt={`Picture of ${user.username}`}/>
              </div>
<div className="profile-infofinal"> 
                          <p>{user.username}</p>
                          <p>{user.role}</p>
                          <p>Preferences:</p>
                          {user.preferences.map((pref, index) => (
                            <p key={index}>{pref}</p>
                          ))}
                          <p>Info about ourselves</p>
                          <p>👩🏿‍💻 👩🏽‍💻 🧑🏼‍💻</p>
                        </div>
                        <section className="button-container">
                        <button
            className="primary-button"
                          type="button"
                          onClick={() => handleLikePerson(user)}>
                          Accept
                        </button>
                        <button
            className="primary-button"
                          type="button"
                          onClick={() =>
                            setDislikedUsers([...dislikedUsers, user.id])
                          }
                        >
                          Decline
                        </button>
                        </section>
                      </div>
                   
                ))
              )}
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

