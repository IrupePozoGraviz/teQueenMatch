/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import React from 'react';

// make it so that when the link to sign out is clicked, the user is logged out and redirected to the home page (the login page) by reloading the page by using window.location.reload() and then redirecting to the home page. You do this in the same way as you did in the Login component, but instead of setting the accessToken and userId to null, you remove them from localStorage using localStorage.removeItem('accessToken') and localStorage.removeItem('userId'). The code for this is commented out below. Uncomment it and make it work. You will need to import localStorage from 'localStorage' at the top of the file and conditionally render the NavBar component in the App component based on whether the user is logged in or not. You can do this by checking if the accessToken is null or not. If it is null, you render the Login component, otherwise you render the NavBar component. You can use the code below as a guide for how to do this.

const handleSignOut = () => {
  if (localStorage.getItem('accessToken')) {
    handleSignOut();
  }
  localStorage.removeItem('accessToken'); // this is the line you need to add to remove the accessToken from localStorage when the user signs out, the localStorage is a built in object in the browser that allows you to store data in the browser
  localStorage.removeItem('userId');
  window.location.reload(); // this reloads the page, which will cause the App component to render again, which will cause the NavBar component to render again, which will cause the user to be redirected to the Login component because the accessToken will be null and the Login component will be rendered instead of the NavBar component because of the conditional rendering in the App component that you will write below like this: {accessToken ? <NavBar /> : <Login />} this line of code should be added inside the return statement of the App component or in the component that is rendering the NavBar component
};

const NavBar = () => {
  return (
    <nav className="logged-in-nav">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>

        <li className="navbar-item">
          <Link to="/dashboard">My Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/edit">Edit Profile</Link>
        </li>
        <li className="navbar-item">
          <Link to="/pot">Potential matches</Link>
        </li>

        <li className="navbar-item">
          <button type="button" onClick={handleSignOut}>Sign Out</button>

        </li>
      </ul>
    </nav>
  );
};
export default NavBar;