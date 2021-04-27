"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Player extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Avatar, { foreignKey: "avatar_id" });
		}
	}
	Player.init(
		{
			name: DataTypes.STRING,
			score: DataTypes.INTEGER,
			avatar_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Player",
			tableName: "players",
			underscored: true,
		}
	);
	return Player;
};
