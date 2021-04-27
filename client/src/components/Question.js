import React from "react";
import PopupWindow from "./PopupWindow";
const Question = ({
  question,
  input,
  score,
  strike,
  strikeRef,
  questionContainer,
  newgame,
  state,
  popupRateState,
}) => {
  return (
    <>
      <div ref={questionContainer}>
        <div>
          <p>{question}</p>
        </div>
        <p>player Name: {input}</p>
        <p>score: {score}</p>
        <p ref={strikeRef}>strikes: {strike}</p>
      </div>
      <PopupWindow state={state} popupRateState={popupRateState} />
    </>
  );
};

export default Question;
