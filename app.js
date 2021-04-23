const express = require("express");
const app = express();
// const morgan = require("morgan");
const Sequelize = require("sequelize");

// morgan.token("reqbody", (req) => {
//   const newObject = {};
//   for (const key in req.body) {
//     if (JSON.stringify(req.body[key]).length > 100) {
//       newObject[key] = "Too many to print...";
//       continue;
//     }
//     newObject[key] = req.body[key];
//   }
//   return JSON.stringify(newObject);
// });

// app.use(express.json());
// app.use(
//   morgan(
//     ":method :url :status :res[content-length] - :response-time ms :reqbody"
//   )
// );
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

app.get("/", (req, res) => {
  Country.findAll({})
    .then(async (country) => {
      res.send(country);
    })
    .catch((err) => console.log(err));
});

app.get("/question1", async (req, res) => {
  let questionData = await QuestionTemplate.findOne({
    order: Sequelize.literal("rand()"),
    where: { type: 2 },
    attributes: ["template", "is_first", "table_name", "column_name", "type"],
  });

  let type = questionData.type;
  let optionsData = "";

  if (type === 1) {
    optionsData = await Country.findAll({
      order: Sequelize.literal("rand()"),
      attributes: ["name"],
      limit: 4,
    });
  } else if (type === 3 || type === 4) {
    optionsData = [true, false];
  } else {
    const snakeToPascal = (string) => {
      return string
        .split("/")
        .map((snake) =>
          snake
            .split("_")
            .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
            .join("")
        )
        .join("/");
    };

    const tableName = questionData.table_name;
    const modelName = snakeToPascal(tableName);
    // const columnName = snakeToCamel(questionData.column_name);

    console.log(tableName);
    console.log(modelName);
    console.log(typeof modelName);

    // console.log(columnName);
    optionsData = await Country.findAll({
      order: Sequelize.literal("rand()"),
      //   attributes: [columnName],
      limit: 4,
    });
  }

  //table_name: "population_density" model:PopulationDensity
  const triviaQuestion = { question: questionData, options: optionsData };
  //   console.log(optionsData);
  //   console.log(JSON.stringify(questionData));
  //   console.log(JSON.stringify(optionsData));
  //   res.json(optionsData);
  res.json(triviaQuestion);
});

module.exports = app;
