'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PopulationDensity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.Country, { targetKey: "name", foreignKey: "country_or_dependent_territory" });
    }
  };
  PopulationDensity.init({
    country_or_dependent_territory: DataTypes.STRING,
    area_km2: DataTypes.STRING,
    population: DataTypes.STRING,
    density_popkm2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PopulationDensity',
    tableName: 'population_density',
    underscored: true,
  });
  return PopulationDensity;
};