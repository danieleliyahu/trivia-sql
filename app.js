const express = require("express");
const app = express();
const morgan = require("morgan");
const Sequelize = require("sequelize");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { or } = require("sequelize");
// const { snakeToPascal } = require("./utils");

morgan.token("reqbody", (req) => {
  const newObject = {};
  for (const key in req.body) {
    if (JSON.stringify(req.body[key]).length > 100) {
      newObject[key] = "Too many to print...";
      continue;
    }
    newObject[key] = req.body[key];
  }
  return JSON.stringify(newObject);
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqbody"
  )
);
app.use(express.static("./client/build"));

const {
  Country,
  CrimeIndex,
  Capital,
  CostOfLivingIndex,
  PopulationDensity,
  QualityOfLifeIndex,
  Player,
  QuestionTemplate,
} = require("./models");


const models = [
  Country,
  CrimeIndex,
  Capital,
  CostOfLivingIndex,
  PopulationDensity,
  QualityOfLifeIndex,
  Player,
  QuestionTemplate,
];


app.get("/", (req, res) => {
  Country.findAll({})
    .then(async (country) => {
      res.send(country);
    })
    .catch((err) => console.log(err));
});

app.get("/question", async (req, res) => {
  let questionData = await QuestionTemplate.findOne({
    order: Sequelize.literal("rand()"),
    where: { [Op.and]: [{ type: 2 }, { is_first: 1 }] },
    // attributes: ["template", "table_name", "model_name", "column_name", "type"],
  });
  let modelName = questionData.model_name;
  let columnName = questionData.column_name;
  let type = questionData.type;
  let optionsData = "";
  let allTheOption;
  let relavantModel;
  let relevantName;
  switch (modelName) {
    case "Country":
      relavantModel = Country;
      relevantName = "name";
      break;
    case "CrimeIndex":
      relavantModel = CrimeIndex;
      relevantName = "country";
      break;
    case "Capital":
      relavantModel = Capital;
      relevantName = "country";
      break;
    case "CostOfLivingIndex":
      relavantModel = CostOfLivingIndex;
      relevantName = "country";
      break;
    case "PopulationDensity":
      relavantModel = PopulationDensity;
      relevantName = "country_or_dependent_territory";
      break;
    case "QualityOfLifeIndex":
      relavantModel = QualityOfLifeIndex;
      relevantName = "country";
      break;}
  if (type === 1) {
    optionsData = await Country.findAll({
      order: Sequelize.literal("rand()"),
      attributes: ["name"],
      limit: 1,
    });
    const names = optionsData.map((data) => {
      console.log(data.toJSON().name);
      return data.toJSON().name;
    });
    console.log(names)


        const rowsFromRelevantTable = await relavantModel.findAll({
      where: {[relevantName]:names},
      attributes: [columnName]
    });
    console.log(rowsFromRelevantTable[0].toJSON()[columnName])
    const answer=(rowsFromRelevantTable[0].toJSON()[columnName]
    )
    const is_first=(questionData.toJSON()["is_first"])
    let other3Options;
    if(is_first){
      other3Options = await relavantModel.findAll({
        where: {[columnName]:{[Op.gt]: answer}},
        limit:3
      });
    }else{
       other3Options = await relavantModel.findAll({
        where: {[columnName]:{[Op.lt]: answer}},
        limit:3
      });
    }
    const name = other3Options.map((data) => {
      console.log(data.toJSON()[relevantName]);
      return data.toJSON()[relevantName];
    });
    console.log(name[0])
     allTheOption={answer:{answerNumber:answer,answerName:names},option1:{option1Name:name[0]},option2:{option2Name:name[1]},option3:{option3Name:name[2]}}
    console.log(allTheOption)
  } else if (type === 3 || type === 4) {
    let template = questionData.template;
    optionsData = await Country.findAll({
      order: Sequelize.literal("rand()"),
      attributes: ["name"],
      limit: 2,
    });
    const names = optionsData.map((data) => {
      console.log(data.toJSON().name);
      return data.toJSON().name;
    });
    const rowsFromRelevantTable = await relavantModel.findAll({
      where: {[Op.or]:[{[relevantName]:names[0]},{[relevantName]:names[1]}]},
      attributes: [columnName]
    });

    console.log(rowsFromRelevantTable)
    const answer1=(rowsFromRelevantTable[0].toJSON()[columnName])
    const answer2=(rowsFromRelevantTable[1].toJSON()[columnName])
    const is_first=(questionData.toJSON()["is_first"])
    optionsData = [true, false];
    let answer;

    const answers = 
      {answer1:answer1,answer1Country:names[0]
    ,answer2:answer2,answer2Country:names[1]}
   
    if(is_first){
      console.log("nihnas la true")
       answer = answers.answer1<answers.answer2
    }else{
      console.log(" looooo nihnas la true")
       answer = answers.answer1>answers.answer2
    }
    answers.answer=answer
     allTheOption = answers
    console.log(answers.answer)
    console.log(answers)
    questionData.template = template.replace("X", names[0]).replace("Y", names[1]);
  } else {
    let template = questionData.template;
    const qustionX = await Country.findOne({
      order: Sequelize.literal("rand()"),
      attributes: ["name"],
    });
    let tmp = qustionX.name;
    questionData.template = template.replace("X", tmp);

    for (model of models) {
      if (model.name === modelName) {
        optionsData = await model.findAll({
          order: Sequelize.literal("rand()"),
          attributes: [columnName],
          limit: 3,
        });
      }
    }
  }

  const triviaQuestion = { question: questionData, options: allTheOption };
  res.json(triviaQuestion);
});

module.exports = app;
