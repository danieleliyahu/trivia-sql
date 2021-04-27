'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.QuestionTemplate, { foreignKey: "type" });
      this.belongsTo(models.QuestionTemplate, { foreignKey: "template" });
    }
  };
  SavedQuestion.init({
    type: DataTypes.INTEGER,
    question_str: DataTypes.STRING,
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
    option3: DataTypes.STRING,
    option4: DataTypes.STRING,
    answer: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    number_of_ratings: DataTypes.INTEGER,
    template: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SavedQuestion',
    tableName: 'saved_questions',
    underscored: true,
  });
  return SavedQuestion;
};