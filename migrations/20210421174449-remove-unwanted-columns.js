"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.removeColumn("countries", "region");
		queryInterface.removeColumn("countries", "coastline");
		queryInterface.removeColumn("countries", "net_migration");
		queryInterface.removeColumn("countries", "infant_mortality_per_1000");
		queryInterface.removeColumn("countries", "gdp");
		queryInterface.removeColumn("countries", "crops");
		queryInterface.removeColumn("countries", "other");
		queryInterface.removeColumn("countries", "climate");
		queryInterface.removeColumn("countries", "agriculture");
		queryInterface.removeColumn("countries", "industry");
		queryInterface.removeColumn("countries", "service");

		queryInterface.removeColumn("crime_indices", "safety_index");

		queryInterface.removeColumn("cost_of_living_indices", "rent_index");
		queryInterface.removeColumn("cost_of_living_indices", "cost_of_living_plus_rent_index");
		queryInterface.removeColumn("cost_of_living_indices", "groceries_index");
		queryInterface.removeColumn("cost_of_living_indices", "local_purchasing_power_index");

		queryInterface.removeColumn("quality_of_life_indices", "purchasing_power_index");
		queryInterface.removeColumn("quality_of_life_indices", "safety_index");
		queryInterface.removeColumn("quality_of_life_indices", "health_care_index");
		queryInterface.removeColumn("quality_of_life_indices", "cost_of_living_index");
		queryInterface.removeColumn("quality_of_life_indices", "property_price_to_income_ratio");
		queryInterface.removeColumn("quality_of_life_indices", "traffic_commute_time_index");
		queryInterface.removeColumn("quality_of_life_indices", "climate_index");

		queryInterface.removeColumn("population_density", "rank");
		queryInterface.removeColumn("population_density", "area_mi2");
		queryInterface.removeColumn("population_density", "density_popmi2");
		queryInterface.removeColumn("population_density", "date");
		queryInterface.removeColumn("population_density", "population_source");
	},

	down: async (queryInterface, Sequelize) => {
		// countries
		queryInterface.addColumn("countries", "region", {
			type: Sequelize.STRING,
		});
		queryInterface.addColumn("countries", "coastline", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "net_migration", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "infant_mortality_per_1000", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "gdp", {
			type: Sequelize.INTEGER,
		});
		queryInterface.addColumn("countries", "crops", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "other", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "climate", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "agriculture", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "industry", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("countries", "service", {
			type: Sequelize.FLOAT,
		});

		// crime_indices
		queryInterface.addColumn("crime_indices", "safety_index", {
			type: Sequelize.FLOAT,
		});

		// cost_of_living_indices
		queryInterface.addColumn("cost_of_living_indices", "rent_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("cost_of_living_indices", "cost_of_living_plus_rent_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("cost_of_living_indices", "groceries_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("cost_of_living_indices", "local_purchasing_power_index", {
			type: Sequelize.FLOAT,
		});

		// quality_of_life_indices
		queryInterface.addColumn("quality_of_life_indices", "purchasing_power_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("quality_of_life_indices", "safety_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("quality_of_life_indices", "health_care_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("quality_of_life_indices", "cost_of_living_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("quality_of_life_indices", "property_price_to_income_ratio", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("quality_of_life_indices", "traffic_commute_time_index", {
			type: Sequelize.FLOAT,
		});
		queryInterface.addColumn("quality_of_life_indices", "climate_index", {
			type: Sequelize.FLOAT,
		});

		// population_density
		queryInterface.addColumn("population_density", "rank", {
			type: Sequelize.STRING,
		});
		queryInterface.addColumn("population_density", "area_mi2", {
			type: Sequelize.STRING,
		});
		queryInterface.addColumn("population_density", "density_popmi2", {
			type: Sequelize.STRING,
		});
		queryInterface.addColumn("population_density", "date", {
			type: Sequelize.DATE,
		});
		queryInterface.addColumn("population_density", "population_source", {
			type: Sequelize.STRING,
		});
	},
};
