// import React from "react";
import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
const Question = ({ question, input, score, strike, strikeRef,qoustion,newgame,state}) => {
  return (
    <>
    {state}
    <div ref={qoustion}>
      <div >
        <p>{question}</p>
      </div>
      <p>player Name: {input}</p>
      <p>score: {score}</p>
      <p ref={strikeRef}>strikes: {strike}</p>
    </div>
    <div ref={newgame}>
    <Link to="/">start</Link>
    </div>
    </>
  );
};

export default Question;
