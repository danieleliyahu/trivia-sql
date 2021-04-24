import "./App.css";
import axios from "axios";
import Question from "./components/Question";
import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState([]);

  const getQuestion = () =>
    axios
      .get(`/question`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          const fullQuestion = data.map((fullQuestion, i) => {
            console.log(fullQuestion);
            return (
              <>
                <div key={i}>
                  <h1 className={"question"}>
                    {fullQuestion.question.template}
                  </h1>
                  <div className={"options"}>{fullQuestion.options.answer}</div>
                  <div className={"options"}>
                    {fullQuestion.options.option1}
                  </div>
                  <div className={"options"}>
                    {fullQuestion.options.option2}
                  </div>
                  <div className={"options"}>
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

  return (
    <div>
      <Question question={question} />
    </div>
  );
}

export default App;
