import React from "react";
import { useState,useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [userName, setuserName] = useState();
  let emailRef = useRef("")
  const [error, seterror] = useState();

  const location = useHistory();
  const register = () => {
    if (!emailRef.current.checkValidity()) {
     return seterror("email most contain @")
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
        seterror("email or user name already exist")
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Sing Up</h1>
      <input
        onChange={(e) => {
          setemail(e.target.value);
        }} 
        ref={emailRef}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        type="password"
        placeholder="password"
      />
      <input
        onChange={(e) => {
          setuserName(e.target.value);
        }}
        placeholder="UserName"
      />
      <button onClick={register}>Sing Up</button>
    <div className={"error"}>{error}</div>
    </div>
  );
};

export default Register;
