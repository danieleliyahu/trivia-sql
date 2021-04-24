import React, { useEffect } from "react";
import { useState } from "react";

const Login = ({ getPlayerName }) => {
  return (
    <div>
      <h1>Login</h1>
      <input
        onChange={(e) => getPlayerName(e)}
        required
        name="[username]"
        type="text"
        placeholder="enter username"
      />
      <button>start game</button>
    </div>
  );
};

export default Login;
