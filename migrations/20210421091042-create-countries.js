'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      coastline: {
        type: Sequelize.FLOAT
      },
      net_migration: {
        type: Sequelize.FLOAT
      },
      infant_mortality_per_1000: {
        type: Sequelize.FLOAT
      },
      gdp: {
        type: Sequelize.INTEGER
      },
      literacy: {
        type: Sequelize.FLOAT
      },
      phones: {
        type: Sequelize.FLOAT
      },
      arable: {
        type: Sequelize.FLOAT
      },
      crops: {
        type: Sequelize.FLOAT
      },
      other: {
        type: Sequelize.FLOAT
      },
      climate: {
        type: Sequelize.FLOAT
      },
      birthrate: {
        type: Sequelize.FLOAT
      },
      deathrate: {
        type: Sequelize.FLOAT
      },
      agriculture: {
        type: Sequelize.FLOAT
      },
      industry: {
        type: Sequelize.FLOAT
      },
      service: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('countries');
  }
};