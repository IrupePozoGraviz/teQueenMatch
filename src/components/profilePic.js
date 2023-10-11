/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from './Utils';
import './css/profilePic.css';

export const Picture = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken) || localStorage.getItem('accessToken');

  const fetchProfilePic = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      };
      const response = await fetch(API_URL(`user/${userId}/profile-picture`), options);
      if (response.ok) {
        const pictureBlob = await response.blob();
        const pictureUrl = URL.createObjectURL(pictureBlob);
        setProfilePicture(pictureUrl);
      } else {
        console.log('Failed to fetch profile picture:', response.status);
      }
    } catch (error) {
      console.log('Error fetching profile picture:', error);
    }
  };

  useEffect(() => {
    fetchProfilePic();
  }, [userId, accessToken]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePicture(previewUrl);
    }
  };

  const cancelPreview = () => {
    setSelectedFile(null);
    fetchProfilePic();
  };

  const uploadProfilePic = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('profilePicture', selectedFile);
      } else {
        console.log('No file or URL selected for upload.');
        return;
      }
      const options = {
        method: 'POST',
        headers: {
          Authorization: accessToken
        },
        body: formData
      };
      const response = await fetch(API_URL(`user/${userId}/upload-profile-picture`), options);
      if (response.ok) {
        console.log('Profile picture uploaded successfully!');
        setProfilePicture(URL.createObjectURL(selectedFile));
      } else {
        console.log('Failed to upload profile picture:', response.status);
      }
    } catch (error) {
      console.log('Error uploading profile picture:', error);
    }
  };

  const deleteProfilePic = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: accessToken
        }
      };
      const response = await fetch(API_URL(`user/${userId}/delete-profile-picture`), options);
      if (response.ok) {
        console.log('Profile picture deleted successfully!');
        setProfilePicture(null);
      } else {
        console.log('Failed to delete profile picture:', response.status);
      }
    } catch (error) {
      console.log('Error deleting profile picture:', error);
    }
  };

  return (
    <div className="picture-container">
      {profilePicture && <img src={profilePicture} alt="Profile" />}
      <div className="picture-container-input">
        <label htmlFor="fileInput">Select a file to upload:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange} />
      </div>
      <button className="secondary-button" type="submit" onClick={uploadProfilePic}>Upload Picture</button>
      {selectedFile && <button className="secondary-button" type="button" onClick={cancelPreview}>Cancel Preview</button>}
      <button className="secondary-button" type="submit" onClick={deleteProfilePic}>Delete Picture</button>
    </div>
  );
};
