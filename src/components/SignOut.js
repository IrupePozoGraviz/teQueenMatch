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
   margin-top: 0px;
   margin-left: 20px;
   border-radius: 16px;
  background-color: rgb(234 216 231 / 90%);
  align-self: flex-end;
  border-top: solid 2px rgb(121, 119, 119);
  
  color: var(--primary - light);
  cursor: pointer;
  font-size: 0.7rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: var(--primary - dark);
    background: var(--primary - light);
    border: solid 2px rgb(48, 48, 48);
    border-bottom: solid 3px rgb(121, 119, 119);
  }
  &:focus {
    outline: none;

  }
  @media screen and(min-width: 840px) {
    font-size: 1rem;
    margin: 1rem;
    padding: 0.7rem 2rem;
  }
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
