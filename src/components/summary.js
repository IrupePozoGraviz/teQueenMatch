import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from 'reducers/quiz';

export const Summary = () => {
  const question = useSelector((state) => state.quiz.questions);
  const answer = useSelector((store) => store.quiz.answers);
  const rightAnswers = answer.filter((item) => item.isCorrect === true);
  const dispatch = useDispatch();

  return (
    <div className="summary">
      <div className="summaryText">
        {/* This return a fitting text depending on how many correct answers you got */}
        {(rightAnswers.length <= 2 && <p>Oj då nästa gång går det bättre!</p>)
          || (rightAnswers.length === 3 && <h2>Det var ju riktigt bra</h2>)
          || (rightAnswers.length >= 4 && <p>Hurrraaaa vilken stjärna!</p>)}
        {/* This display number of correct answers and number of total answers */}
        <p> Du fick {rightAnswers.length} av {question.length}! </p>
      </div>
      <div className="rightAnswers">
        {answer.map((answerr) => {
        //   This returns the chosen answer and the correct answer to every question

          return (

            <div key={answerr.questionId} className="answers">
              <p>
                <b>Fråga: {answerr.question.id}</b>
              </p>

              <span>
                <p>Right answer: {answerr.question.options[answerr.question.correctAnswerIndex]}</p>
              </span>
              <p>Your answer: {answerr.answer}</p>
            </div>
          );
        })}
      </div>
      <button
        className="restartButton"
        type="button"
        onClick={() => {
          dispatch(quiz.actions.restart());
        }}>
        {' '}
          Spela igen{' '}
      </button>
    </div>
  );
};
