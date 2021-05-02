import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createCookie } from "../utils/cookies";

const SingIn = ({ loggedIn, tokenValidate }) => {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [wrongUser, setwrongUser] = useState();
  const [error, seterror] = useState();
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
          createCookie("accessToken", result.data.accessToken, 1);
          createCookie("refreshToken", result.data.refreshToken, 100);
          loggedIn();
          tokenValidate();
          location.push("/game");
        }
      })
      .catch((err) => {
        console.log(err);
        seterror("User or Password are incorrect");
      });
  };
  return (
    <>
      <div className="signinpage">
        <h1 className="loginheader">Sign In</h1>
        <h4 className="loginheader2">play and learn about the world</h4>
        <form>
          <input
            className="loginInput"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email"
          />
          <input
            className="loginInput"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button className={"link linkButton"} onClick={login}>
            Sign in
          </button>
        </form>
        <p className="joinnow">
          Dont have an account yet? <Link to="/register"> Join now </Link>
        </p>
      </div>
      {/* <div className={"error"}>{error}</div> */}
    </>
  );
};

export default SingIn;
