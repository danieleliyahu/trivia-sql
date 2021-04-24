const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Sequelize = require("sequelize");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { or } = require("sequelize");
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

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqbody"
  )
);
app.use(express.static("./client/build"));

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
  async function randomQuestion() {
    console.log("startttttttttttttttttttttttttttttttttttttttttttttt");
    try {
      let questionData = await QuestionTemplate.findOne({
        order: Sequelize.literal("rand()"),
        //   where: { [Op.and]: [{ type: 1 }] },
        // attributes: ["template", "table_name", "model_name", "column_name", "type"],
      });
      const modelName = questionData.model_name;
      const columnName = questionData.column_name;
      const type = questionData.type;
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
          break;
      }

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

        const rowsFromRelevantTable = await relavantModel.findAll({
          where: { [relevantName]: names },
          attributes: [columnName],
        });
        const answer = rowsFromRelevantTable[0].toJSON()[columnName];
        const is_first = questionData.toJSON()["is_first"];
        let other3Options;
        if (is_first) {
          other3Options = await relavantModel.findAll({
            where: { [columnName]: { [Op.gt]: answer } },
            limit: 3,
          });
        } else {
          other3Options = await relavantModel.findAll({
            where: { [columnName]: { [Op.lt]: answer } },
            limit: 3,
          });
        }
        const name = other3Options.map((data) => {
          console.log(data.toJSON()[relevantName]);
          return data.toJSON()[relevantName];
        });
        allTheOption = {
          answer: { answerNumber: answer, answerName: names },
          option1: { option1Name: name[0] },
          option2: { option2Name: name[1] },
          option3: { option3Name: name[2] },
        };
      } else if (type === 3) {
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
          where: {
            [Op.or]: [
              { [relevantName]: names[0] },
              { [relevantName]: names[1] },
            ],
          },
          attributes: [columnName],
        });

        const answer1 = rowsFromRelevantTable[0].toJSON()[columnName];
        const answer2 = rowsFromRelevantTable[1].toJSON()[columnName];
        const is_first = questionData.toJSON()["is_first"];
        optionsData = [true, false];
        let answer;

        const answers = {
          answer1: answer1,
          answer1Country: names[0],
          answer2: answer2,
          answer2Country: names[1],
        };

        if (is_first) {
          answer = answers.answer1 < answers.answer2;
        } else {
          answer = answers.answer1 > answers.answer2;
        }
        answers.answer = answer;
        allTheOption = answers;
        questionData.template = template
          .replace("X", names[0])
          .replace("Y", names[1]);
      } else {
        let template = questionData.template;
        const qustionX = await Country.findOne({
          order: Sequelize.literal("rand()"),
          attributes: ["name"],
        });
        let tmp = qustionX.name;
        questionData.template = template.replace("X", tmp);

        const rowsFromRelevantTable = await relavantModel.findAll({
          where: { [relevantName]: tmp },
          attributes: [columnName],
        });
        const answer = rowsFromRelevantTable[0].toJSON()[columnName];

        let other3Options;
        other3Options = await relavantModel.findAll({
          order: Sequelize.literal("rand()"),
          limit: 3,
        });
        const option1 = other3Options[0].toJSON()[columnName];
        const option2 = other3Options[1].toJSON()[columnName];
        const option3 = other3Options[2].toJSON()[columnName];

        allTheOption = {
          answer: { answer },
          option1: { option1 },
          option2: { option2 },
          option3: { option3 },
        };
        allTheOption.answer = answer;
      }

      const triviaQuestion = [{ question: questionData, options: allTheOption }];
      res.json(triviaQuestion);
      return true;
    } catch (err) {
      console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      randomQuestion();
      //   res.json({ err: err.message });
      return false;
    }
  }
  if (!randomQuestion()) {
    randomQuestion();
    console.log("tried again");
  }
});

module.exports = app;
