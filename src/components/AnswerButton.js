import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
background-color: ${(props) => {
    if (props.clicked && !props.disabled) {
      return '#DFFF00';
    }
    if (props.clicked && !props.correct && props.disabled) {
      return '#D2042D';
    }
    if (props.correctIndex && props.disabled) {
      return '#28a745';
    }
    if (!props.clicked) {
      return '#FF00FF';
    }
  }};
  color:#000000;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
  width: 100px;
  height: 100px;
  font-weight: 500px;

  &:disabled {
    color: #000000;
    cursor: not-allowed;
  }
`;

export const Form = ({
  setAnswer,
  setOptionIndex,
  questionAnswered,
  option,
  index,
  correctIndex,
  answerIndex,
  allAnswersSubmitted
}) => {
  const correctOption = answerIndex >= 0
      && index === correctIndex
      && (questionAnswered || allAnswersSubmitted)
      && (index === answerIndex || allAnswersSubmitted);

  const clickedOption = index === answerIndex;

  return (
    <section className="button-container">

      <StyledButton
        id={option}
        type="button"
        key=""
        onClick={() => {
          setAnswer(option);
          setOptionIndex(index);
        }}
        value={option}
        clicked={clickedOption}
        correct={correctOption}
        disabled={questionAnswered}
        correctIndex={index === correctIndex}
        allAnswersSubmitted={allAnswersSubmitted}>
        {`${option}`}
      </StyledButton>
    </section>
  );
};