"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.dropTable("countries_age_structures");
		queryInterface.dropTable("health_care_indices");
		queryInterface.dropTable("properties_price_indices");
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.createTable("countries_age_structures", {
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

		queryInterface.createTable("health_care_indices", {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			country: {
				primaryKey: true,
				type: Sequelize.STRING,
			},
			health_care_index: {
				type: Sequelize.FLOAT,
			},
			health_care_exp_index: {
				type: Sequelize.FLOAT,
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

		queryInterface.createTable("properties_price_indices", {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			country: {
				primaryKey: true,
				type: Sequelize.STRING,
			},
			price_to_income_ratio: {
				type: Sequelize.FLOAT,
			},
			gross_rental_yield_city_centre: {
				type: Sequelize.FLOAT,
			},
			gross_rental_yield_outside_of_centre: {
				type: Sequelize.FLOAT,
			},
			price_to_rent_ratio_city_centre: {
				type: Sequelize.FLOAT,
			},
			price_to_rent_ratio_outside_of_city_centre: {
				type: Sequelize.FLOAT,
			},
			mortgage_as_a_percentage_of_income: {
				type: Sequelize.FLOAT,
			},
			affordability_index: {
				type: Sequelize.FLOAT,
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
};
