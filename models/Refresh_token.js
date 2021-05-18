"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class refresh_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  refresh_token.init(
    {
      refresh_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Refresh_token",
      tableName: "refresh_tokens",
    }
  );
  return refresh_token;
};
