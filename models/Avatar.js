"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Avatar extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Player, { foreignKey: "avatar_id" });
		}
	}
	Avatar.init(
		{
			img_src: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Avatar",
			tableName: "avatars",
			underscored: true,
		}
	);
	return Avatar;
};
