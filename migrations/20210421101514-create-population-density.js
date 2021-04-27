'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('population_density', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      country_or_dependent_territory: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.STRING
      },
      area_km2: {
        type: Sequelize.FLOAT
      },
      area_mi2: {
        type: Sequelize.FLOAT
      },
      population: {
        type: Sequelize.INTEGER
      },
      density_popkm2: {
        type: Sequelize.FLOAT
      },
      density_popmi2: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.DATE
      },
      population_source: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('population_density');
  }
};