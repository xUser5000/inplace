const sequelize = require("../core/db");

const { STRING, BOOLEAN, INTEGER, DOUBLE, ARRAY } = require("sequelize");

const Offer = sequelize.define("offers", {
	longitude: {
		type: DOUBLE,
		allowNull: false,
		validate: {
			min: -180,
			max: 180
		}
	},
	latitude: {
		type: DOUBLE,
		allowNull: false,
		validate: {
			min: -90,
			max: 90
		}
	},
	images: {
		type: ARRAY(STRING),
		allowNull: false,
		validate: {
			min: 1,
			isUrl: true
		}
	},
	isFurnished: {
		type: BOOLEAN,
		allowNull: false
	},
	forRent: {
		type: BOOLEAN,
		allowNull: false
	},
	forSale: {
		type: BOOLEAN,
		allowNull: false
	},
	rentCost: {
		type: DOUBLE,
		allowNull: false,
		defaultValue: 0
	},
	saleCost: {
		type: DOUBLE,
		allowNull: false,
		defaultValue: 0
	},
	floorNumber: {
		type: INTEGER
	},
	roomCount: {
		type: INTEGER
	},
	bedCount: {
		type: INTEGER
	},
	bathroomCount: {
		type: INTEGER
	},
	area: {
		type: DOUBLE
	},
	appliances: {
		type: ARRAY(STRING)
	},
	notes: {
		type: STRING
	},
	description: {
		type: STRING,
		allowNull: false,
		validate: {
			max: 50
		}
	},
	capacity: {
		type: INTEGER,
		allowNull: false
	}
});
module.exports = { Offer };
