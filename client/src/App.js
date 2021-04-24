import "./App.css";
import axios from "axios";
import Question from "./components/Question";
import { useEffect,useRef, useState } from "react";

function App() {
  const [answer, setanswer] = useState(null)
  let [question, setQuestion] = useState([]);
  let [clientAnswer, setclientAnswer] = useState(null);
  let [count, setcount] = useState(0);
  let onButtonClick = (e) => {
    setcount(count+1)
    // console.log(e.target.innerText);
    let clientAnswer1 = e.target.innerText
    // setanswer("hi")
    // console.log("answer is answer",answer)
    // console.log("answer is clientAnswer",clientAnswer)
    setclientAnswer(clientAnswer1)
    // if(clientAnswer===answer){
    //   console.log("great")
    // }
  };
  const getQuestion = () =>
    axios
      .get(`/question`)
      .then(({ data }) => {
       
        // console.log(data[0].options.answer);
        if (data) {
          const fullQuestion = data.map((fullQuestion, i) => {
            if(undefined===fullQuestion.options.answer1){
              setanswer(fullQuestion.options.answer)
            }else{

              setanswer(fullQuestion.options.answer1)
            }
            console.log(answer)
            return (
              <>
                <div key={i}>
                  <h1 className={"question"}>
                    {fullQuestion.question.template}
                  </h1>
                  <div  onClick={(e)=>onButtonClick(e)}  className={"options"}>{fullQuestion.options.answer}</div>
                  <div onClick={(e)=>onButtonClick(e)} className={"options"}>
                    {fullQuestion.options.option1}
                  </div>
                  <div onClick={(e)=>onButtonClick(e)}  className={"options"}>
                    {fullQuestion.options.option2}
                  </div>
                  <div onClick={(e)=>onButtonClick(e)}  className={"options"}>
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
    console.log("the answer spouse to be ",answer)
    console.log("your click on",clientAnswer)
    if(clientAnswer==answer){
      console.log("great")
    }else{console.log("wrong answer")}
  }, [count]);
  return (
    <div>
      <Question question={question} />
    </div>
  );
}

export default App;
