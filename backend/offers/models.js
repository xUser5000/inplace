const sequelize = require("../core/db");
const { STRING, BOOLEAN, INTEGER, DOUBLE, DataTypes } = require("sequelize");
const Offer = sequelize.define("offers", {
	Location: { type: DataTypes.ARRAY(DataTypes.DOUBLE), allowNull: false },
	Images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
	IsFurnished: { type: BOOLEAN, allowNull: false },
	ForSale: { type: BOOLEAN, defaultValue: false, allowNull: false },
	ForRent: { type: BOOLEAN, defaultValue: false, allowNull: false },
	salePrice: { type: DOUBLE, allowNull: false, defaultValue: 0.0 },
	rentPrice: { type: DOUBLE, allowNull: false, defaultValue: 0.0 },
	FLoorsNumber: { type: INTEGER },
	RoomsNumber: { type: INTEGER },
	BedsNumber: { type: INTEGER },
	Area: { type: DOUBLE },
	ListOfAppliances: { type: STRING },
	Notes: { type: STRING }
});
module.exports = { Offer };
