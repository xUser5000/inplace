const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World\n");
});

async function main() {
    await pool.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255))");

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

main();
