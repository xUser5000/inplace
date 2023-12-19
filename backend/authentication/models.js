const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
const VerificationToken = sequelize.define("token", {
	content: {
		type: DataTypes.STRING,
		allowNull: false
	}
});
module.exports = { VerificationToken };
