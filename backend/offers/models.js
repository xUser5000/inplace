const sequelize = require("../core/db");

const { STRING, BOOLEAN, INTEGER, DOUBLE, ARRAY } = require("sequelize");

const Offer = sequelize.define("offers", {
	longitude: {
		type: DOUBLE,
		allowNull: false
	},
	latitude: {
		type: DOUBLE,
		allowNull: false
	},
	images: {
		type: ARRAY(STRING),
		allowNull: false
	},
	isFurnished: {
		type: BOOLEAN,
		allowNull: false
	},
	cost: {
		type: DOUBLE,
		allowNull: false
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
	listOfApplications: {
		type: ARRAY(STRING)
	},
	notes: {
		type: STRING
	},
	description: {
		type: STRING
	},
	capacity: {
		type: INTEGER,
		allowNull: false
	}
});
module.exports = { Offer };
