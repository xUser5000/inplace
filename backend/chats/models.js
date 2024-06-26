const sequelize = require("../core/db");
const { User } = require("../users/models");
const { DataTypes } = require("sequelize");

const Message = sequelize.define("message", {
	sender_id: {
		type: INTEGER,
		references: {
			model: User,
			key: "id"
		}
	},
	receiver_id: {
		type: INTEGER,
		references: {
			model: User,
			key: "id"
		}
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false
	},
	time_stamp: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
});

Message.belongsTo(User, {
	foreignKey: "userId",
	as: "user"
});

User.hasMany(Message, {
	foreignKey: "userId",
	as: "messages"
});
module.exports = { Message };
