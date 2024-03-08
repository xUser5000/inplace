const fs = require("fs");
const sequelize = require("./../core/db.js");
const { User } = require("./../users/models.js");
const { Offer } = require("./../offers/models.js");
const { off } = require("process");
(async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connection established");
		await sequelize.sync();
		console.log("All models were synchronized successfully");
	} catch (error) {
		console.error("Error establishing database connection:", error);
	}
})();

// READ JSON FILE
const offers = JSON.parse(
	fs.readFileSync(`${__dirname}/offers-dev-data.json`, "utf-8")
);
const users = JSON.parse(
	fs.readFileSync(`${__dirname}/users-dev-data.json`, "utf-8")
);
const importData = async () => {
	try {
		await Offer.bulkCreate(offers, { individualHooks: true });
		await User.bulkCreate(users, { individualHooks: true });
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await sequelize.truncate();
		console.log("Data successfully deleted!");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--drop") {
	deleteData();
}
