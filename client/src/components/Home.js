// import React, { useEffect } from "react";
// import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "../App.css";

const Home = ({ getPlayerName, input, leaderBoardTable }) => {
  return (
    <>
      <div className={"loginconteiner"}>
        <h1 className="loginheader">Login</h1>
        <div>
          <Link className={"gameLink"} to="/game">
            start
          </Link>
          <Link className={"leaderBoardLink"} to="/leaderboard">
            leaderboard
          </Link>
          <Link className={"leaderBoardLink"} to="/register">
            sign up
          </Link>
          <Link className={"leaderBoardLink"} to="/signin">
            log in
          </Link>
        </div>
      </div>
      {leaderBoardTable}
    </>
  );
};

export default Home;