const express = require("express");
const sequelize = require("./core/db");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World\n");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await sequelize.authenticate();
    console.log("Database connection established");
    console.log(`Server is running on port ${PORT}`);
});
