const sequelize = require("../core/db");
const { INTEGER } = require("sequelize");
const { User } = require("../users/models");
const { Offer } = require("../offers/models");

const Like = sequelize.define("likes", {
	userId: {
		type: INTEGER,
		references: {
			model: User,
			key: "id"
		}
	},
	offerId: {
		type: INTEGER,
		references: {
			model: Offer,
			key: "id"
		}
	}
});

User.belongsToMany(Offer, { through: Like });
Offer.belongsToMany(User, { through: Like });

module.exports = { Like };
