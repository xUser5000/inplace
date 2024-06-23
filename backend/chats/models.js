const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const Message = sequelize.define("message", {
	content: {
		type: DataTypes.STRING,
		allowNull: false
	},
	user: {
		type: DataTypes.STRING,
		allowNull: false
	},
	time_stamp: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
});

module.exports = { Message };
