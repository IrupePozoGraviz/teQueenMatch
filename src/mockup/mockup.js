/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { mentees } from './UserData';
import NavBarNew from '../components/LogedInNavNew';
import './mockup.css'; // import in the same folder as the component you want to style like this: import './Mockup.css';

export const UserCard = () => {
  const [currentMenteeIndex, setCurrentMenteeIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  const handleNextMentee = () => {
    const nextIndex = currentMenteeIndex + 1;
    if (nextIndex < mentees.length) {
      setCurrentMenteeIndex(nextIndex);
    } else {
      console.log('No more mentees to show.');
      // You can handle the case when there are no more mentees to show
    }
  };

  const handleLikePerson = (likePersonUserId) => {
    console.log(`Liked: ${likePersonUserId}`);
    setLikedUsers([...likedUsers, likePersonUserId]);
    handleNextMentee();
  };

  const handleDislikePerson = (dislikePersonUserId) => {
    console.log(`Disliked: ${dislikePersonUserId}`);
    setDislikedUsers([...dislikedUsers, dislikePersonUserId]);
    handleNextMentee();
  };

  const menteesData = mentees[currentMenteeIndex];

  return (

    <div className="">
      <NavBarNew />
      <div className="person-card-mockup">
        <div className="profile-header-mockup">
          <div className="Lizzo">
            <p className="loged-in-name-mockup">Lizzo</p>
            <p className="role-mentor-mockup">Mentor | </p>
          </div>
          <p className="loged-in-text-mockup">  | logged in</p>
        </div>

        <div className="photo-container-mockup">
          <img src={menteesData.image} alt="mentee" />
        </div>
        <div className="profile-info-mockup">
          <h3>{menteesData.firstName} {menteesData.lastName} {menteesData.emoji}</h3>
          <p>{menteesData.pronoun} / / {menteesData.role}</p>
          <p>{menteesData.bio}</p>
          <p>{menteesData.preferences}</p>
        </div>
      </div>
      <div className="button-container-mockup">
        <button
          className="primary-button-mockup"
          type="button"
          onClick={() => handleLikePerson(menteesData.id)}>
                    Accept
        </button>
        <button
          className="primary-button-mockup"
          type="button"
          onClick={() => handleDislikePerson(menteesData.id)}>
                    Decline
        </button>
      </div>
    </div>

  );
};
