/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import jabala from '../images/jabala.svg';
import jaqueline1 from '../images/jaqueline1.svg';
import jerry from '../images/jerry.svg';
import jolee from '../images/jolee.svg';
import julie from '../images/julie.svg';
import './avatar.css';

const AvatarSelection = ({ selectedAvatar, onAvatarChange }) => {
  const avatarOptions = [
    { value: 'jabala', image: jabala },
    { value: 'jaqueline1', image: jaqueline1 },
    { value: 'jerry', image: jerry },
    { value: 'jolee', image: jolee },
    { value: 'julie', image: julie }
  ];

  const handleAvatarChange = (event) => {
    const selectedValue = event.target.value;
    onAvatarChange(selectedValue);
  };

  return (
    <div className="avatar">
      {avatarOptions.map((avatarOption) => (
        <label key={avatarOption.value} htmlFor={avatarOption.value}>
          <input
            className="avatar-input"
            type="radio"
            id={avatarOption.value}
            name="avatar"
            value={avatarOption.value}
            checked={selectedAvatar === avatarOption.value}
            onChange={handleAvatarChange} />
          <div className="avatar-image">
            <img src={avatarOption.image} alt={avatarOption.label} />
          </div>
          {avatarOption.label}
        </label>
      ))}
    </div>
  );
};

export default AvatarSelection;

