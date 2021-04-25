import "./App.css";
import axios from "axios";
import Question from "./components/Question";
import Login from "./components/Login";

import { shuffleArray, gameOver } from "./utils";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function App() {
  const [answer, setanswer] = useState(null);
  const [state, setstate] = useState(null);
  const [popupRateState, setPopupRateState] = useState(null);

  const [question, setQuestion] = useState([]);
  const [clientAnswer, setclientAnswer] = useState(null);
  const [count, setcount] = useState(0);
  const [score, setScore] = useState(0);
  const [strike, setStrike] = useState(0);
  const [input, setInput] = useState();
  const [leaderBoardTable, setLeaderBoardTable] = useState();
  const questionContainer = useRef();
  const newgame = useRef();
  const popupvaild = useRef();

  const onButtonClick = (e) => {
    setcount(count + 1);
    let clientAnswer1 = e.target.innerText;
    setclientAnswer(clientAnswer1);
    if (strike !== 1) {
      ratePopupWindow();
    }

    console.log("RATEEE");
  };

  const getPlayerName = (e) => {
    setInput(e.target.value);
  };

  const getLeaderBoard = () =>
    axios
      .get(`/leaderBoard`)
      .then(({ data }) => {
        setLeaderBoardTable(
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
        );
        console.log(leaderBoardTable);
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Request failed with status code 404") {
          return;
        }
      });

  console.log(leaderBoardTable);

  const getQuestion = () =>
    axios
      .get(`/question`)
      .then(({ data }) => {
        if (data) {
          const fullQuestion = data.map((fullQuestion, i) => {
            if (undefined === fullQuestion.options.answer1) {
              setanswer(fullQuestion.options.answer);
            } else {
              setanswer(fullQuestion.options.answer1);
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
                <div key={i}>
                  <h1 className={"question"}>
                    {fullQuestion.question.template}
                  </h1>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
                    {shuffledOptions[0]}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
                    {shuffledOptions[1]}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
                    {shuffledOptions[2]}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
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

  useEffect(() => {
    getQuestion();
    getLeaderBoard();
  }, []);

  useEffect(() => {
    getQuestion();
    if (clientAnswer == answer) {
      if (count >= 1) {
        setScore(score + 100);
      }
    } else {
      setStrike(strike + 1);
      console.log(strike);
      if ((strike === 3) & (count >= 1)) {
        console.log(strike);
        gameOver(input, score, strike, popupWindow, getLeaderBoard);
      }
    }
  }, [count]);

  const togglePopup = () => {
    popupvaild.current.className = "popup";
  };

  const ratePopupWindow = () => {
    if (count >= 1) {
      popupvaild.current.className = "popup active";
    }
    console.log("popup function");
    return setPopupRateState(
      <div className="popup active" ref={popupvaild} id="popup-1">
        <div className="overlay "></div>
        <div ref={popupvaild} className="contentPopup active">
          <div class="close-btn" onClick={togglePopup}></div>
          <h1>PLEASE RATE THE QUESTION👍</h1>
          <div>⭐</div>
          <div>⭐⭐</div>
          <div>⭐⭐⭐</div>
          <div>⭐⭐⭐⭐</div>
          <div>⭐⭐⭐⭐⭐</div>
          <div className="closeVaildButton">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>
      </div>
    );
  };

  const popupWindow = () => {
    return setstate(
      <div className="popup active" ref={popupvaild} id="popup-1">
        <div className="overlay "></div>
        <div ref={popupvaild} className="contentPopup active">
          <div class="close-btn" onClick={togglePopup}>
            <Link to="/">start</Link>;
          </div>
          <h1>GAME OVER😢</h1>
          <div>{input}</div>
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
                state={state}
                popupRateState={popupRateState}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                {...props}
                getPlayerName={getPlayerName}
                input={input}
                leaderBoardTable={leaderBoardTable}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
