const sequelize = require("../core/db");
const { User } = require("../users/models");

const { STRING, BOOLEAN, INTEGER, DOUBLE, ARRAY, ENUM } = require("sequelize");

const OFFER_TYPE_ENUM = ["for_rent", "for_sale"];

const Offer = sequelize.define("offers", {
	title: {
		type: STRING,
		allowNull: false,
		validate: {
			max: 50
		}
	},
	description: {
		type: STRING
	},
	longitude: {
		type: DOUBLE,
		allowNull: true,
		validate: {
			min: -180,
			max: 180
		}
	},
	latitude: {
		type: DOUBLE,
		allowNull: true,
		validate: {
			min: -90,
			max: 90
		}
	},
	area: {
		type: DOUBLE,
		allowNull: false
	},
	offerType: {
		type: ENUM(...OFFER_TYPE_ENUM),
		allowNull: false
	},
	offerPrice: {
		type: DOUBLE,
		allowNull: false
	},
	images: {
		type: ARRAY(STRING),
		allowNull: true,
		validate: {
			min: 1,
			isUrl: true
		}
	},
	isFurnished: {
		type: BOOLEAN
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
	appliances: {
		type: STRING
	}
});

User.hasMany(Offer, { foreignKey: "userId", as: "user" });
Offer.belongsTo(User);

module.exports = { Offer, OFFER_TYPE_ENUM };
