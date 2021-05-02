import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { readCookie, eraseCookie } from "../utils/cookies";
import axios from "axios";

const Home = ({ userName, setuserName, validUser, setvalidUser }) => {
  const location = useHistory();
  const deleteToken = () => {
    const token = readCookie("refreshToken");
    eraseCookie("refreshToken");
    eraseCookie("accessToken");
    axios.delete("/users/token", {
      headers: {
        authorization: token,
      },
    });
    setvalidUser(false);
    setuserName("guest");
    location.push("/");
  };

  return (
    <>
      <div className="screen">
        <div className="hello"> hello {userName}</div>
        <div className="halfscreen"> </div>
        <div className={"loginconteiner"}>
          <h1 className="loginheader">Welcome.</h1>
          <h2 className="loginheader2">World's Best Trivia Game</h2>
          <div className="buttons">
            {validUser ? (
              <Link className={"link"} to="/userleaderBoard">
                my leaderboard
              </Link>
            ) : null}

            <Link className={"link"} to="/leaderboard">
              leaderboard
            </Link>

            {!validUser ? (
              <Link className={"link"} to="/register">
                sign up
              </Link>
            ) : null}

            {!validUser ? (
              <Link className={"link"} to="/signin">
                log in
              </Link>
            ) : null}

            {validUser ? (
              <Link className={"link"} to="/game">
                start
              </Link>
            ) : null}

            {validUser ? (
              <button className={"link linkButton"} onClick={deleteToken}>
                LOG OUT
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
