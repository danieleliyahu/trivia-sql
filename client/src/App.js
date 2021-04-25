import "./App.css";
import axios from "axios";
import Question from "./components/Question";
import Login from "./components/Login";
import { shuffleArray, gameOver, saveGameResult } from "./utils";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [answer, setanswer] = useState(null);
  const [question, setQuestion] = useState([]);
  const [clientAnswer, setclientAnswer] = useState(null);
  const [count, setcount] = useState(0);
  const [score, setScore] = useState(0);
  const [strike, setStrike] = useState(0);
  const [input, setInput] = useState();
  const [leaderBoardTable, setLeaderBoardTable] = useState();

  const onButtonClick = (e) => {
    // getPokemonData()
    setcount(count + 1);
    let clientAnswer1 = e.target.innerText;
    setclientAnswer(clientAnswer1);
  };

  const getPlayerName = (e) => {
    setInput(e.target.value);
  };

  // const leader = () => {
  //   axios
  //     .get(`/leaderBoard`)
  //     .then(({ data }) => {
  //       console.log(data);
  //       // const rows = data.map((row, i) => {
  //       //   return (
  //       //     <div key={i}>
  //       //       {row.id} {row.name} {row.score}
  //       //     </div>
  //       //   );
  //       // });
  //       // setclientsInfo(clients);
  //     })
  //     .catch((error) => {
  //       console.log("There was an error", error);
  //     });
  // };

  // useEffect(() => {
  //   let playerRow = axios
  //     .get(`/leaderBoard`)
  //     .then(({ data }) => {
  //       return data
  //     })
  //     .catch((error) => {
  //       console.log("There was an error", error);
  //     });
  //     // playerRow.then((x)=>{setLeaderBoardTable(x)})
  //     console.log(leaderBoardTable)
      
  // }, []);
  const getLeaderBoard = () =>

    axios.get(`/leaderBoard`)
      .then(({ data }) => {
        setLeaderBoardTable(
        <table> 
           <tr>
               <th >RANK</th>
               <th >NAME</th>
               <th >SCORE</th>
           </tr>
           {data.map((row,i)=>{
              return(
                <tr >
                    <td >{row.id}</td>
                    <td >{row.name}</td>
                    <td >{row.score}</td>
                </tr>
              )
           })}
       </table> )
       console.log(leaderBoardTable)
      })
      .catch(error => {
        console.log(error)
        if (error.message === "Request failed with status code 404"
        ) {
          return
        }

      })

  
  console.log(leaderBoardTable)

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
    getLeaderBoard()
    

  }, []);

  useEffect(() => {
    getQuestion();
    console.log("the answer suposed to be ", answer);
    console.log("you clicked on", clientAnswer);
    if (clientAnswer == answer) {
      console.log("great");
      if (count >= 1) {
        setScore(score + 100);
      }
    } else {
      console.log("wrong answer");
      setStrike(strike + 1);
      console.log(strike);
      if ((strike === 1) & (count >= 1)) {
        console.log("game over");
        gameOver(input, score);
      }
    }
  }, [count]);

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
