import React from 'react';
import styled from 'styled-components'; // install styled-components using npm install styled-components --save

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

  const StyledSignOutButton = styled.button`
    background: var(--primary-dark);
   border-top: solid 2px rgb(121, 119, 119);
  border-radius: 5px;
  color: var(--primary-light);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  &:hover {
  color: var(--primary-dark);
  background: var(--primary-light);
  border: solid 2px rgb(48, 48, 48);
  border-bottom: solid 3px rgb(121, 119, 119);
  }
`;

  return (
    <div>
      <StyledSignOutButton
        type="button"
        onClick={handleSignOut}>
        Sign Out
      </StyledSignOutButton>
    </div>
  );
};

export default SignOutButton;
