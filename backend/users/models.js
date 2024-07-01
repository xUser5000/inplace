const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	bio: {
		type: DataTypes.STRING,
		validate: {
			max: 50
		}
	},
	avatar: {
		type: DataTypes.STRING,
		validate: {
			isUrl: true
		}
	},
	phone_number: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

// by default, return users without password to the frontend
User.prototype.toJSON = function () {
	var values = Object.assign({}, this.get());

	delete values.password;
	return values;
};

module.exports = { User };
