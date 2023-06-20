import React from 'react';
import { useSelector } from 'react-redux';

export const Progress = () => {
  const currentQuestion = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const totalQuestions = 5;
  const questionsLeft = totalQuestions - currentQuestion - 1;

  return (
    <div>
      <p>
        {`Question ${currentQuestion + 1} of ${totalQuestions}`}
      </p>
      <p>
        {`Questions left: ${questionsLeft}`}
      </p>
    </div>
  );
};
