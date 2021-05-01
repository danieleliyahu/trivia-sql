import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createCookie } from "../utils/cookies";

const SingIn = ({ loggedIn }) => {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [wrongUser, setwrongUser] = useState();

  const location = useHistory();
  const login = ({}) => {
    axios
      .post("http://localhost:3001/users/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.data === "User or Password incorrect") {
          console.log("user not exists");
        } else {
          console.log(result.data);
          createCookie("accessToken", result.data.accessToken, 1);
          createCookie("refreshToken", result.data.refreshToken, 1);
          loggedIn();
          location.push("/game");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Log In</h1>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="email"
      />
      <input
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        type="password"
        placeholder="password"
      />
      <button onClick={login}>Sing in</button>
      {/* {wrongUser} */}
    </div>
  );
};

export default SingIn;
