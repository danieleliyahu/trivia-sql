"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasOne(models.Capital, {sourceKey:"name", foreignKey: "country" });
			this.hasOne(models.CrimeIndex, {sourceKey:"name", foreignKey: "country" });
			this.hasOne(models.CostOfLivingIndex, {sourceKey:"name", foreignKey: "country" });
			this.hasOne(models.QualityOfLifeIndex, {sourceKey:"name" ,foreignKey: "country" });
			this.hasOne(models.PopulationDensity, {
				sourceKey: "name",
				foreignKey: "country_or_dependent_territory",
			});
		}
	}
	Country.init(
		{
			name: DataTypes.STRING,
			literacy: DataTypes.FLOAT,
			phones: DataTypes.FLOAT,
			arable: DataTypes.FLOAT,
			birthrate: DataTypes.FLOAT,
			deathrate: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Country",
			tableName: "countries",
			underscored: true,
		}
	);
	return Country;
};
