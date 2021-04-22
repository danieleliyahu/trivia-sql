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
  const qdata = await QuestionTemplate.findOne({
    order: Sequelize.literal("rand()"),
    where: { type: 1 },
    attributes: ["template", "is_first", "table_name", "column_name"],
  });

  const odata = await Country.findAll({
    order: Sequelize.literal("rand()"),
    attributes: ["name"],
    limit: 4,
  });

  const triviaQuestion = { question: qdata, options: odata };

  console.log(JSON.stringify(qdata));
  console.log(JSON.stringify(odata));
  res.json(triviaQuestion);
});

module.exports = app;
