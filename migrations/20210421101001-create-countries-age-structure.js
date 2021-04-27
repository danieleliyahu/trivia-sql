"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("countries_age_structures", {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			country: {
				primaryKey: true,
				type: Sequelize.STRING,
			},
			age_0_to_14_years: {
				type: Sequelize.FLOAT,
			},
			age_15_to_64: {
				type: Sequelize.STRING,
			},
			age_above_65_years: {
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
		await queryInterface.dropTable("countries_age_structures");
	},
};
