const { Sequelize } = require("sequelize");

const requireSSL = process.env.NODE_ENV === "production";

const sequelize = new Sequelize({
	dialect: "postgres",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	dialectOptions: requireSSL
		? {
				ssl: {
					require: requireSSL
				}
		  }
		: {}
});

module.exports = sequelize;
