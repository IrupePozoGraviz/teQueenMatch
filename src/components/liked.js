
/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */


/* Here you will see your liked mentors or mentees/*/

import React from 'react';
import { useSelector } from 'react-redux';
import NavBarNew from './LogedInNavNew';

export const Liked = () => {
  const currentUser = useSelector((store) => store.user);
  const potentialMatches = useSelector((store) => store.potentialMatches);

  /* if (!currentUser) {
    return <div>Loading...</div>; // Show a loading state until the user data is available
  } */

  return (
    <div className="nav">
      <NavBarNew />
      <main className="dashboard">
        <div className="box-container">
         
          <section className="matched">
            <h2>You Liked {potentialMatches ? potentialMatches.length : 0}</h2>
			<p>Here you can see all your Liked matches</p>
           
          </section>
          
        </div>
      </main>
    </div>
  );
};