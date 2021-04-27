'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties_Price_Indices', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      country: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      price_to_income_ratio: {
        type: Sequelize.FLOAT
      },
      gross_rental_yield_city_centre: {
        type: Sequelize.FLOAT
      },
      gross_rental_yield_outside_of_centre: {
        type: Sequelize.FLOAT
      },
      price_to_rent_ratio_city_centre: {
        type: Sequelize.FLOAT
      },
      price_to_rent_ratio_outside_of_city_centre: {
        type: Sequelize.FLOAT
      },
      mortgage_as_a_percentage_of_income: {
        type: Sequelize.FLOAT
      },
      affordability_index: {
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
    await queryInterface.dropTable('Properties_Price_Indices');
  }
};