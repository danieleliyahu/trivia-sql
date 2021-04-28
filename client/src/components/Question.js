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
      <div className="navBar">
        <span className="playerstate"> Name: {input}</span>
        <span className="playerstate" ref={strikeRef}>
          Strikes: {strike}
        </span>
        <span className="playerstate">Score: {score}</span>
      </div>
      <div ref={questionContainer}>
        <div>
          <p>{question}</p>
        </div>
      </div>
      <PopupWindow state={state} popupRateState={popupRateState} />
    </>
  );
};

export default Question;
