"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CrimeIndex extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	CrimeIndex.init(
		{
			country: DataTypes.STRING,
			crime_index: DataTypes.FLOAT,
			safety_index: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "CrimeIndex",
			tableName: "crime_indices",
		}
	);
	return CrimeIndex;
};
