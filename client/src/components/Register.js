import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [userName, setuserName] = useState();

  const register = () => {
    axios
      .post("http://localhost:3001/users/register", {
        email,
        password,
        userName,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
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
    </div>
  );
};

export default Register;
