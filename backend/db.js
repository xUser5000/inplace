const { Pool } = require("pg");

const pool = new Pool({
    host: "db",
    port: 5432,
    user: "user",
    password: "passowrd",
    database: "database"
});

module.exports = pool;