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
import placeholder from '../images/placeholder.png';
import './cards.css';


export const Matched = () => {
  const [matchingList, setMatchingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

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

  const handleLikePerson = (user) => {
    const likePersonUserId = user._id;

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
        if (json.accessToken) {
          setLikedUsers(json.likedPersons);

          // Check for a match
          if (json.matched) {
            setMatchedUsers([...matchedUsers, user]);
          }
        } else if (json.error) {
          console.error('API error:', json.error);
        } else {
          console.error('Failed to save liked person');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const filteredMatchingList = matchingList.filter(
    (user) =>
      !likedUsers.includes(user.id) && !dislikedUsers.includes(user.id)
  );

  return (
    <div className="nav">
      <NavBar />
      <main className="dashboard">
        <div className="box-container">
        <div className="profile-header">
  <h1>{`Here are your matched ${currentUser.role === 'mentee' ? 'mentors' : 'mentees'}`}</h1>
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
                        src={placeholder}
                        alt="placeholder"
                      />
                    </div>
                    <div className="profile-infofinal">
                      <div className="name-containerfinal">
                        <p>{user.username} // {user.role}</p>
                      </div>
                      <div className="preferences">
                        <p>Preferences: </p>
                        {user.preferences.map((pref, index) => (
                          <p key={index}>{pref}</p>
                        ))}
                      </div>
                      <div className="email">
                        <p>{user.email}</p>
                      </div>
                      <div className="emojis">
                        <p>👩🏽‍🌾💂🏼‍♂️🧑🏻‍🎓</p>
                      </div>
                    </div>
                    <section className="button-container">
                      <button
                        className="primary-button"
                        type="button"
                        onClick={() => handleLikePerson(user)}
                      >
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
