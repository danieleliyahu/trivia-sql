import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState([]);

  const getQuestion = async () => {
    const { data } = await axios.get("/question");
    setQuestion(data);
    console.log(data);
    return;
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return <div></div>;
}

export default App;
