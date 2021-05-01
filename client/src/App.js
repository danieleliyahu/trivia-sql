import "./App.css";
import "./Popup.css";
import axios from "axios";
import Question from "./components/Question";
import Home from "./components/Home";
import Register from "./components/Register";
import LeaderBoard from "./components/LeaderBoard";
import SingIn from "./components/SignIn";

import { readCookie,createCookie } from "./utils/cookies";

// import Cookies from "js-cookie";

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
  const [validUser, setvalidUser] = useState();
  const [user, setuser] = useState();
  const questionContainer = useRef();
  const newgame = useRef();
  const popupvaild = useRef();


  const [score, setScore] = useState(0);
  const [userName, setuserName] = useState();
  const [email, setemail] = useState();
  // let userName;
  // let email;
  // const [isSavedQuestion, setIsSavedQuestion] = useState();
  let rankstate;
  useEffect(() => {
    tokenValidate()
  }, [validUser])
  const tokenValidate = () => {
    let token = (readCookie("accessToken"))

      axios.post("http://localhost:3001/users/tokenValidate", {
        //...data
      }, {
        headers: {
          'Authorization': `${token}` 
        }
      }).then((result)=>{
        console.log(result.data)
        if (result.data.valid) {
          // console.log("hiiiiiiiiiiiiiiii")
          // email=result.data.info.email
          // userName=result.data.info.userName

          setvalidUser(result.data.valid)
          setemail(result.data.info.email)
          setuserName(result.data.info.userName)
          // setemail()

        }else{
          // console.log("Byeeeeeeeeeeeeeeeee")
          setvalidUser(false)
          // setuserName("")
        }
 
        console.log("hiiiiiiiii")
      }).catch((err)=>{
        console.log(err)
      })
  };
  useEffect(() => {
    const interval = setInterval(() => {
      let token = (readCookie("refreshToken"));
      axios
      .post("http://localhost:3001/users/token", {
        token,
      })
      .then((result) => {
        // console.log(result.data)
        // console.log("result.data.userName")
        // console.log(playerName)
        createCookie("accessToken", result.data.accessToken,1);
        // setplayerName(result.data.userName)
        tokenValidate()
      })
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
                <th>SCORE</th>
              </tr>
              {data.map((row, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.score}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
        console.log(leaderBoardTable);
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Request failed with status code 404") {
          return;
        }
      });
  const getQuestion = () =>
    axios
      .get(`/question`)
      .then(({ data }) => {
        if (data) {
          // setIsSavedQuestion(false);
          const fullQuestion = data.map((fullQuestion, i) => {
            console.log(fullQuestion.options);
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
      console.log("im a saved question");
    } else {
      getQuestion();
      console.log("im a random question");
    }
    if (strike !== 2) {
      ratePopupWindow();
      console.log(answer, "dsadsadasd");
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
      console.log(strike);
      if ((strike === 2) & (count >= 1)) {
        console.log(answer, "dsadsadasd");
        console.log(strike);
        gameOver(input,score,userName,email, strike, popupWindow, getLeaderBoard,setStrike);
      }
    }
  }, [count]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     create("/users/token", { token: Cookies.get("refreshToken") })
  //       .then((res) => {
  //         Cookies.set("accessToken", res.accessToken);
  //         console.log("refreshed the acces token");
  //       })
  //       .catch((err) => console.error(err));
  //   }, 9000);

  //   return () => clearInterval(interval);
  // });

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
          // number_of_ratings: 0,
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
          // number_of_ratings: 0,
        },
      });
    }
  };

  const getSavedQuestion = () => {
    axios
      .get(`/savedQuestion`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          // setIsSavedQuestion(true);
          const fullQuestion = data.map((fullQuestion, i) => {
            console.log(fullQuestion.answer);
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
              console.log(fullQuestion.option1);
              console.log(fullQuestion.option2);
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

  const popupWindow = () => {
    return setpopup(
      <div className="popup active" ref={popupvaild} id="popup-1">
        <div className="overlay "></div>
        <div ref={popupvaild} className="contentPopup active">
          <div class="close-btn">
            <Link to="/">start</Link>;
          </div>
          <h1>GAME OVER😢</h1>
          {/* <div>{userName}</div> */}
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
      <Router>
        <Switch>
         { validUser?
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
          />: "you need to log in"}
          <Route
            exact
            path="/"
            render={(props) => (
              <Home {...props} getPlayerName={getPlayerName} input={input} />
            )}
          />

          <Route
            exact
            path="/register"
            render={(props) => <Register {...props} />}
          />
              {/* tokenValidate */}
          {/* <Route exact path="/signin">
            <SingIn
              loggedIn={() => {
                setuser(true);
              }}
            />
          </Route> */}
          <Route
            exact
            path="/signin"
            render={(props) => (
              <SingIn {...props} loggedIn={() => {
                setuser(true);
              }} tokenValidate={tokenValidate} />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
