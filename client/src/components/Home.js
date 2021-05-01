import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { readCookie, eraseCookie } from "../utils/cookies";
import axios from "axios";

const Home = ({ leaderBoardTable, setuserName, setvalidUser }) => {
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
          <button className={"gameLink"} onClick={deleteToken}>
            LOG OUT
          </button>
        </div>
      </div>
      {leaderBoardTable}
    </>
  );
};

export default Home;
