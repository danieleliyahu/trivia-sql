import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { readCookie, eraseCookie } from "../utils/cookies";
import axios from "axios";

const Home = ({ setuserName, validUser, setvalidUser }) => {
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
      <div className={"loginconteiner"}>
        <h1 className="loginheader">Login</h1>
        <div>
          {validUser ? (
            <Link className={"leaderBoardLink"} to="/userleaderBoard">
              my leaderboard
            </Link>
          ) : null}

          <Link className={"leaderBoardLink"} to="/leaderboard">
            leaderboard
          </Link>

          {!validUser ? (
            <Link className={"leaderBoardLink"} to="/register">
              sign up
            </Link>
          ) : null}

          {!validUser ? (
            <Link className={"leaderBoardLink"} to="/signin">
              log in
            </Link>
          ) : null}

          {validUser ? (
            <Link className={"leaderBoardLink"} to="/game">
              start
            </Link>
          ) : null}

          {validUser ? (
            <button className={"gameLink"} onClick={deleteToken}>
              LOG OUT
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
