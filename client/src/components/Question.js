import React from "react";

const Question = ({ question, input, score, strike, strikeRef }) => {
  return (
    <>
      <div>
        <p>{question}</p>
      </div>
      <p>player Name: {input}</p>
      <p>score: {score}</p>
      <p ref={strikeRef}>strikes: {strike}</p>
    </>
  );
};

export default Question;
