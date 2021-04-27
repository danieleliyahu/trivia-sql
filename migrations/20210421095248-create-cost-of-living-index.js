'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cost_of_living_indices', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      country: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      cost_of_living_index: {
        type: Sequelize.FLOAT
      },
      rent_index: {
        type: Sequelize.FLOAT
      },
      cost_of_living_plus_rent_index: {
        type: Sequelize.FLOAT
      },
      groceries_index: {
        type: Sequelize.FLOAT
      },
      restaurant_price_index: {
        type: Sequelize.FLOAT
      },
      local_purchasing_power_index: {
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
    await queryInterface.dropTable('cost_of_living_indices');
  }
};