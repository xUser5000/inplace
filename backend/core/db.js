const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "database",
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password"
});

module.exports = sequelize;
