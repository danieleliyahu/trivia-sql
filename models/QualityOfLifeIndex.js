"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class QualityOfLifeIndex extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Country, { targetKey: "name", foreignKey: "country" });
		}
	}
	QualityOfLifeIndex.init(
		{
			country: DataTypes.STRING,
			quality_of_life_index: DataTypes.INTEGER,
			pollution_index: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "QualityOfLifeIndex",
			tableName: "quality_of_life_indices",
		}
	);
	return QualityOfLifeIndex;
};
