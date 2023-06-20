import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { quiz } from 'reducers/quiz';
import { CurrentQuestion } from 'components/CurrentQuestion';
// import { Footer } from 'components/Footer';
import { StartPage } from 'components/StartPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const reducer = combineReducers({
  quiz: quiz.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Container>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/quiz" element={<CurrentQuestion />} />
          </Routes>
        </BrowserRouter>

      </Provider>
    </Container>
  );
}