"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SavedQuestion, { foreignKey: "type" });
      this.hasMany(models.SavedQuestion, { foreignKey: "template" });
    }
  }
  QuestionTemplate.init(
    {
      template: DataTypes.STRING,
      type: DataTypes.INTEGER,
      is_first: DataTypes.BOOLEAN,
      table_name: DataTypes.STRING,
      model_name: DataTypes.STRING,
      column_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QuestionTemplate",
      tableName: "question_templates",
      underscored: true,
    }
  );
  return QuestionTemplate;
};
