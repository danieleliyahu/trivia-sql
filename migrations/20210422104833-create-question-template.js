"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("question_templates", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      template: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.INTEGER,
      },
      is_first: {
        type: Sequelize.BOOLEAN,
      },
      table_name: {
        type: Sequelize.STRING,
      },
      model_name: {
        type: Sequelize.STRING,
      },
      column_name: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("question_templates");
  },
};
