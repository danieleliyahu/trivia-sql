import React from "react";
import { Link } from "react-router-dom";
import PopupWindow from "./PopupWindow";
const Question = ({
  question,
  input,
  score,
  strike,
  strikeRef,
  questionContainer,
  newgame,
  popup,
  popupRateState,
  userName,
}) => {
  return (
    <>
      <div className="navBar">
        <span className="playerstate"> Name: {userName}</span>
        <span className="playerstate" ref={strikeRef}>
          Strikes: {strike !== 3 ? strike : strike}
        </span>
        <span className="playerstate">Score: {score}</span>
        <Link className={"playerstate"} to="/">
          HOME
        </Link>
      </div>
      <div ref={questionContainer}>
        <div>
          <p>{question}</p>
        </div>
      </div>
      <PopupWindow popup={popup} popupRateState={popupRateState} />
    </>
  );
};

export default Question;
