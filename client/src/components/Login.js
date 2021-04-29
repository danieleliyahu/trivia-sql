// import React, { useEffect } from "react";
// import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "../App.css";

const Login = ({ getPlayerName, input, leaderBoardTable }) => {
  return (
    <>
      <div className={"loginconteiner"}>
        <h1 className="loginheader">Login</h1>
        <div>
          <input
            onChange={(e) => getPlayerName(e)}
            required
            className={"loginInput"}
            name="[username]"
            type="text"
            placeholder="enter username"
          />
        </div>
        <div>
          <Link className={"gameLink"} to="/game">
            start
          </Link>
          <Link className={"leaderBoardLink"} to="/leaderboard">
            leaderboard
          </Link>
        </div>
      </div>
      {leaderBoardTable}
    </>
  );
};

export default Login;
