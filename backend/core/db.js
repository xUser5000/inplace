const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "db",
    port: 5432,
    username: "user",
    password: "password",
    database: "database"
});

module.exports = sequelize;
