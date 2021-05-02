import React from "react";
import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [userName, setuserName] = useState();
  let emailRef = useRef("");
  const [error, seterror] = useState();

  const location = useHistory();
  const register = () => {
    if (!emailRef.current.checkValidity()) {
      return seterror("email most contain @");
    }
    axios
      .post("http://localhost:3001/users/register", {
        email,
        password,
        userName,
      })
      .then((result) => {
        console.log(result.data);
        location.push("/signin");
      })
      .catch((err) => {
        seterror("email or user name already exist");
        console.log(err);
      });
  };
  return (
    <>
      <div className="signinpage">
        <h1 className="loginheader">Sing Up</h1>
        <h4 className="loginheader2">play and learn about the world</h4>

        <form>
          <input
            className="loginInput"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            ref={emailRef}
            type="email"
            placeholder="Email"
          />
          <input
            className="loginInput"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <input
            className="loginInput"
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            placeholder="UserName"
          />
          <button className={"link linkButton"} onClick={register}>
            Sign Up
          </button>
        </form>
        <p className="joinnow">
          Already have an account? <Link to="/signin">Sign in </Link>
        </p>
      </div>
      {/* <div className={"error"}>{error}</div> */}
    </>
  );
};

export default Register;
