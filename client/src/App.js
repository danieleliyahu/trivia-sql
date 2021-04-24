import "./App.css";
import axios from "axios";
import Question from "./components/Question";
import Login from "./components/Login";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [answer, setanswer] = useState(null);
  let [question, setQuestion] = useState([]);
  let [clientAnswer, setclientAnswer] = useState(null);
  let [count, setcount] = useState(0);
  const [input, setInput] = useState();

  const onButtonClick = (e) => {
    setcount(count + 1);
    let clientAnswer1 = e.target.innerText;
    setclientAnswer(clientAnswer1);
  };

  const getPlayerName = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
    console.log(input);
  };

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
            console.log(answer);
            return (
              <>
                <div key={i}>
                  <h1 className={"question"}>
                    {fullQuestion.question.template}
                  </h1>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
                    {fullQuestion.options.answer}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
                    {fullQuestion.options.option1}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
                    {fullQuestion.options.option2}
                  </div>
                  <div onClick={(e) => onButtonClick(e)} className={"options"}>
                    {fullQuestion.options.option3}
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
  }, []);

  useEffect(() => {
    getQuestion();
    console.log("the answer spouse to be ", answer);
    console.log("your click on", clientAnswer);
    if (clientAnswer == answer) {
      console.log("great");
    } else {
      console.log("wrong answer");
    }
  }, [count]);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Question {...props} question={question} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} getPlayerName={getPlayerName} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
