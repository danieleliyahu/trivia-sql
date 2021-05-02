import "./App.css";
import "./Popup.css";
import axios from "axios";
import Question from "./components/Question";
import Home from "./components/Home";
import Register from "./components/Register";
import LeaderBoard from "./components/LeaderBoard";
import UserLeaderBoard from "./components/UserLeaderBoard";
import SingIn from "./components/SignIn";

import { readCookie, createCookie } from "./utils/cookies";
import { shuffleArray, gameOver } from "./utils";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function App() {
  const [answer, setanswer] = useState(null);
  const [popup, setpopup] = useState(null);
  const [popupRateState, setPopupRateState] = useState(null);
  const [question, setQuestion] = useState([]);
  const [clientAnswer, setclientAnswer] = useState(null);
  const [count, setcount] = useState(0);
  const [strike, setStrike] = useState(0);
  const [input, setInput] = useState();
  const [QuestionInfo, setQuestionInfo] = useState();
  const [leaderBoardTable, setLeaderBoardTable] = useState();
  const [userleaderBoardTable, setuserLeaderBoardTable] = useState();
  const [validUser, setvalidUser] = useState();
  const [user, setuser] = useState();
  const questionContainer = useRef();
  const newgame = useRef();
  const popupvaild = useRef();
  const [score, setScore] = useState(0);
  const [userName, setuserName] = useState("guest");
  const [email, setemail] = useState();
  let rankstate;

  useEffect(() => {
    tokenValidate();
  }, [validUser]);
  const tokenValidate = () => {
    let token = readCookie("accessToken");

    axios
      .post(
        "http://localhost:3001/users/tokenValidate",
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((result) => {
        if (result.data.valid) {
          setvalidUser(result.data.valid);
          setemail(result.data.info.email);
          setuserName(result.data.info.userName);
        } else {
          setvalidUser(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      let token = readCookie("refreshToken");
      axios
        .post("http://localhost:3001/users/token", {
          token,
        })
        .then((result) => {
          createCookie("accessToken", result.data.accessToken, 1);
          tokenValidate();
        });
    }, 9000);

    return () => clearInterval(interval);
  });

  const onButtonClick = (e) => {
    setcount(count + 1);
    let clientAnswer1 = e.target.innerText;
    setclientAnswer(clientAnswer1);
  };

  const getPlayerName = (e) => {
    setInput(e.target.value);
  };

  const getLeaderBoard = () =>
    axios
      .get(`/leaderBoard`)
      .then(({ data }) => {
        setLeaderBoardTable(
          <div className="leaderboardcontainer">
            <h1 className="leaderboardheader">LEADER BOARD</h1>

            <table>
              <tr>
                <th>RANK</th>
                <th>NAME</th>
                <th>BEST SCORE</th>
              </tr>
              {data.map((row, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{row.user_name}</td>
                    <td>{row.score}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Request failed with status code 404") {
          return;
        }
      });

  // const getUserLeaderBoard = () => {
  //   axios
  //     .post(`/userleaderBoard`)
  //     .then(({ data }) => {
  //       console.log(data);
  //       setuserLeaderBoardTable(
  //         <div className="leaderboardcontainer">
  //           <h1 className="leaderboardheader">LEADER BOARD</h1>
  //           <table>
  //             <tr>
  //               <th>RANK</th>
  //               <th>BEST SCORE</th>
  //             </tr>
  //             {data.map((row, i) => {
  //               return (
  //                 <tr>
  //                   <td>{i + 1}</td>
  //                   <td>{row.score}</td>
  //                 </tr>
  //               );
  //             })}
  //           </table>
  //         </div>
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.message === "Request failed with status code 404") {
  //         return;
  //       }
  //     });
  // };

  const getUserLeaderBoard = () => {
    axios({
      method: "post",
      url: "/userleaderBoard",
      data: {
        user_name: userName,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setuserLeaderBoardTable(
          <div className="leaderboardcontainer">
            <h1 className="leaderboardheader">LEADER BOARD</h1>
            <table>
              <tr>
                <th>RANK</th>
                <th>SCORE</th>
              </tr>
              {data.map((row, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{row.score}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Request failed with status code 404") {
          return;
        }
      });
  };

  const getQuestion = () =>
    axios
      .get(`/question`)
      .then(({ data }) => {
        if (data) {
          const fullQuestion = data.map((fullQuestion, i) => {
            if (undefined === fullQuestion.options.answer1) {
              setQuestionInfo(fullQuestion);
              setanswer(fullQuestion.options.answer);
            } else {
              setQuestionInfo(fullQuestion);
              setanswer(fullQuestion.options.answer1);
            }
            if (typeof fullQuestion.options.answer === "boolean") {
              return (
                <>
                  <div key={i}>
                    <div className={"questionDiv"}>
                      <h1 className={"question"}>
                        {fullQuestion.question.template}
                      </h1>
                    </div>
                    <div className={"option12"}>
                      <div
                        onClick={(e) => onButtonClick(e)}
                        className={"option"}
                      >
                        {fullQuestion.options.option1}
                      </div>
                      <div
                        onClick={(e) => onButtonClick(e)}
                        className={"option"}
                      >
                        {fullQuestion.options.option2}
                      </div>
                    </div>
                  </div>
                </>
              );
            }
            const options = [
              fullQuestion.options.answer,
              fullQuestion.options.option1,
              fullQuestion.options.option2,
              fullQuestion.options.option3,
            ];
            const shuffledOptions = shuffleArray(options);
            return (
              <>
                <div className={"continer"} key={i}>
                  <div className={"questionDiv"}>
                    <h1 className={"question"}>
                      {fullQuestion.question.template}
                    </h1>
                  </div>
                  <div className={"option12"}>
                    <div onClick={(e) => onButtonClick(e)} className={"option"}>
                      {shuffledOptions[0]}
                    </div>

                    <div onClick={(e) => onButtonClick(e)} className={"option"}>
                      {shuffledOptions[1]}
                    </div>
                  </div>
                  <div className={"option34"}>
                    <div onClick={(e) => onButtonClick(e)} className={"option"}>
                      {shuffledOptions[2]}
                    </div>

                    <div onClick={(e) => onButtonClick(e)} className={"option"}>
                      {shuffledOptions[3]}
                    </div>
                  </div>
                </div>
              </>
            );
          });
          setQuestion(fullQuestion);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    getQuestion();
    getLeaderBoard();
  }, []);

  useEffect(() => {
    if ((count % 3 === 0) & (count >= 1)) {
      getSavedQuestion();
    } else {
      getQuestion();
    }
    if (strike !== 2) {
      ratePopupWindow();
      if (count >= 1) {
        popupvaild.current.className = "popup active";
      }
    }
    if (clientAnswer == answer) {
      if (count >= 1) {
        setScore(score + 100);
      }
    } else {
      setStrike(strike + 1);
      if ((strike === 2) & (count >= 1)) {
        gameOver(
          input,
          score,
          userName,
          email,
          strike,
          popupWindow,
          getLeaderBoard,
          setStrike,
          setScore
        );
      }
    }
  }, [count]);

  const togglePopup = () => {
    popupvaild.current.className = "popup";
  };

  const postQuestionRating = () => {
    if (QuestionInfo.saved === true) {
      axios({
        method: "post",
        url: "/rating",
        data: {
          type: QuestionInfo.type,
          question_str: QuestionInfo.template,
          template: QuestionInfo.template,
          option1: QuestionInfo.option1,
          option2: QuestionInfo.option2,
          option3: QuestionInfo.option3,
          answer: QuestionInfo.answer,
          rating: rankstate,
        },
      });
    } else {
      axios({
        method: "post",
        url: "/rating",
        data: {
          type: QuestionInfo.question.type,
          question_str: QuestionInfo.question.template,
          template: QuestionInfo.question.template,
          option1: QuestionInfo.options.option1,
          option2: QuestionInfo.options.option2,
          option3: QuestionInfo.options.option3,
          answer: QuestionInfo.options.answer,
          rating: rankstate,
        },
      });
    }
  };

  const getSavedQuestion = () => {
    axios
      .get(`/savedQuestion`)
      .then(({ data }) => {
        if (data) {
          const fullQuestion = data.map((fullQuestion, i) => {
            fullQuestion.saved = true;
            setQuestionInfo(fullQuestion);
            setanswer(fullQuestion.answer);
            if (fullQuestion.answer === "0") {
              setanswer("false");
              fullQuestion.answer = false;
            } else if (fullQuestion.answer === "1") {
              setanswer("true");
              fullQuestion.answer = true;
            }
            if (typeof fullQuestion.answer === "boolean") {
              return (
                <>
                  <div key={i}>
                    <div className={"questionDiv"}>
                      <h1 className={"question"}>{fullQuestion.template}</h1>
                    </div>
                    <div onClick={(e) => onButtonClick(e)} className={"option"}>
                      {fullQuestion.option1}
                    </div>
                    <div onClick={(e) => onButtonClick(e)} className={"option"}>
                      {fullQuestion.option2}
                    </div>
                  </div>
                </>
              );
            }
            const options = [
              fullQuestion.answer,
              fullQuestion.option1,
              fullQuestion.option2,
              fullQuestion.option3,
            ];
            const shuffledOptions = shuffleArray(options);
            return (
              <>
                <div key={i}>
                  <div className={"questionDiv"}>
                    <h1 className={"question"}>{fullQuestion.template}</h1>
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"option"}>
                    {shuffledOptions[0]}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"option"}>
                    {shuffledOptions[1]}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"option"}>
                    {shuffledOptions[2]}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"option"}>
                    {shuffledOptions[3]}
                  </div>
                </div>
              </>
            );
          });
          setQuestion(fullQuestion);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickRank = (number) => {
    rankstate = number;
    postQuestionRating();
    togglePopup();
  };
  const ratePopupWindow = () => {
    return setPopupRateState(
      <div className="popup " ref={popupvaild} id="popup-1">
        <div className="overlay "></div>
        <div ref={popupvaild} className="contentPopup ">
          <div class="close-btn" onClick={togglePopup}></div>
          <h1>PLEASE RATE THE QUESTION👍</h1>
          <div>
            <div onClick={(e) => onClickRank(1)}>⭐</div>
            <div onClick={(e) => onClickRank(2)}>⭐⭐</div>
            <div onClick={(e) => onClickRank(3)}>⭐⭐⭐</div>
            <div onClick={(e) => onClickRank(4)}>⭐⭐⭐⭐</div>
            <div onClick={(e) => onClickRank(5)}>⭐⭐⭐⭐⭐</div>
          </div>
          <div className="closeVaildButton">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>
      </div>
    );
  };
  const closePopup = () => {
    setpopup(null);
  };
  const popupWindow = () => {
    return setpopup(
      <div className="popup active" ref={popupvaild} id="popup-1">
        <div className="overlay "></div>
        <div ref={popupvaild} className="contentPopup active">
          <div class="close-btn">
            <Link onClick={() => closePopup()} to="/">
              start
            </Link>
          </div>
          <h1>GAME OVER😢</h1>
          <div>{score}</div>
          <div className="closeVaildButton">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      hello {userName}
      <Router>
        <Switch>
          {validUser ? (
            <Route
              exact
              path="/game"
              render={(props) => (
                <Question
                  {...props}
                  question={question}
                  input={input}
                  score={score}
                  strike={strike}
                  questionContainer={questionContainer}
                  newgame={newgame}
                  popup={popup}
                  popupRateState={popupRateState}
                  userName={userName}
                />
              )}
            />
          ) : (
            "you need to log in"
          )}
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                getPlayerName={getPlayerName}
                input={input}
                setuserName={setuserName}
                validUser={validUser}
                setvalidUser={setvalidUser}
              />
            )}
          />

          <Route
            exact
            path="/register"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/signin"
            render={(props) => (
              <SingIn
                {...props}
                loggedIn={() => {
                  setuser(true);
                }}
                tokenValidate={tokenValidate}
              />
            )}
          />
          <Route path="/game">
            {user ? <Question /> : <h1>User not logged</h1>}
          </Route>

          <Route
            exact
            path="/leaderboard"
            render={(props) => (
              <LeaderBoard {...props} leaderBoardTable={leaderBoardTable} />
            )}
          />

          <Route
            exact
            path="/userleaderBoard"
            render={(props) => (
              <UserLeaderBoard
                {...props}
                userleaderBoardTable={userleaderBoardTable}
                getUserLeaderBoard={getUserLeaderBoard}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
