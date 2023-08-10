import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from '../reducers/User';

const SignOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user session, authentication tokens, etc.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    // Dispatch action to clear user state
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    // ... (clear other user state properties)

    // Redirect to the start page
    navigate('/');
  };

  const StyledSignOutButton = styled.button`
    /* Your styling code here */
  `;

  return (
    <div>
      <StyledSignOutButton
        className="sign-out-button"
        type="button"
        onClick={handleSignOut}>
                Sign Out
      </StyledSignOutButton>
    </div>
  );
};

export default SignOutButton;
