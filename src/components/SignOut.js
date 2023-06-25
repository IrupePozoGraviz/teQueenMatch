import React from 'react';
// import { Link } from 'react-router-dom';

const SignOutButton = () => {
  /* const handleSignOut = () => {
    if (localStorage.getItem('accessToken')) {
      console.log('sign out');
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.reload();
  }; */
  const handleSignOut = () => {
    window.location.reload();
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }, 0);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleSignOut}
        className="sign-out-btn">
        <span className="hover-text">Sign Out?</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48">
          <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621-612l43-43 176 176-174 174Z" />
        </svg>
      </button>
    </div>
  );
};

export default SignOutButton;
