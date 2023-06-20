import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quiz } from 'reducers/quiz';
import { Player } from '@lottiefiles/react-lottie-player';
import { Summary } from './summary';
import { Progress } from './progress';
import { Form } from './AnswerButton';

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex]);

  const dispatch = useDispatch();
  const quizOver = useSelector((state) => state.quiz.quizOver);

  const [answer, setAnswer] = useState(null);
  const [optionIndex, setOptionIndex] = useState(undefined);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const handleOkayButtonClick = (questionId, answerIndex) => {
    dispatch(quiz.actions.submitAnswer({ questionId, answerIndex }));
    setQuestionAnswered(true);
  };

  const handleNextButton = () => {
    dispatch(quiz.actions.goToNextQuestion());
    setQuestionAnswered(false);
    setAnswer('');
  };

  return (
    <section>
      {quizOver ? (
        <Summary />
      ) : (
        <div>
          <div>
            <div className="title-container">
              <h2> Fråga {question.id} of 5 </h2>
              <h3> {question.questionText} </h3>
            </div>

            <div className="lottie-container">
              <Player
                src={question.animation}
                loop
                autoplay
                speed={1}
                style={{
                  width: '100%',
                  height: '20rem',
                  margin: '0'
                }} />
            </div>
            <div className=" question-container">
              {question.options.map((option, index) => {
                return (
                  <Form
                    setAnswer={setAnswer}
                    setOptionIndex={setOptionIndex}
                    answer={answer}
                    questionAnswered={questionAnswered}
                    option={option}
                    index={index}
                    answerIndex={optionIndex}
                    correctIndex={question.correctAnswerIndex} />
                );
              })}
            </div>
          </div>
          <div className="buttons">
            <button
              className="okBtn"
              type="button"
              onClick={() => handleOkayButtonClick(question.id, optionIndex)}
              disabled={questionAnswered || answer === null}>
              Svara
            </button>
            <button
              className="nextBtn"
              type="button"
              onClick={handleNextButton}
              disabled={!questionAnswered || answer === null}>
             Spela Vidare
            </button>
          </div>
          <Progress />
        </div>
      )}
    </section>
  );
};
