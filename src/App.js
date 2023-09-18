/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line import/no-named-as-default
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from './reducers/User';
import AuthRedirect from './components/AuthRedirect';
import { EditProfilePage } from './components/EditProfilePage';
import { Picture } from './components/profilePic'
import Home from './components/Home';
import { UserCard } from './mockup/mockup';
import { Potential } from './components/potentialmatches';
import { Matched } from './components/matched';
import { Liked } from './components/liked';
import loadingReducer from './reducers/loader';

import Loader from './components/Loader';
import { RegistrationPage } from './components/registration'

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    loading: loadingReducer
  });
  const store = configureStore({ reducer });

  return (

    <Provider store={store}>
      <Loader />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRedirect />} />
          <Route path="/" element={<Home />} />
          <Route path="/tinder-cards" element={<UserCard />} />
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/picture" element={<Picture />} />
          <Route path="/pot" element={<Potential />} />
          <Route path="/matched" element={<Matched />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}