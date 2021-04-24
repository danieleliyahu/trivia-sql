import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState([]);


  
  useEffect(() => {
  axios.get(`http://localhost:3001/question`).then(({ data }) => {
    console.log(data.question);
    
        console.log(data);
        if(data){
          const clients = data.map((client, i) => {
            console.log(client)
              return (
                <>
              <h1 key={i} className={"question"}>
                {client.question.template} </h1>)
                <div key={i} className={"options"}>
                {client.question.template}
                </div>
                <div key={i} className={"options"}>
                {client.question.template}
                </div>
                <div key={i} className={"options"}>
                {client.question.template}
                </div>
                </>
          )})
            setQuestion(clients);
        }

    

  })
    // .catch((error) => { console.log("There was an error", error); })
},[])

  return <div>
    <p>{question}</p>
  </div>;
}

export default App;
