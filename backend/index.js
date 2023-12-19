// Libraries
const express = require("express");
const morgan = require("morgan");
const joi = require("joi");
require("express-async-errors");

// environment variables
require("dotenv").config();

// Custom modules
const sequelize = require("./core/db");
const { errorHandler, schemaValidator } = require("./core/middlewares");
const { authRouter } = require("./authentication/router");
const { offersRouter } = require("./offers/routes");
const { jwtFilter } = require("./authentication/middlewares");

const app = express();

// Global Middlewares
app.use(express.json());
app.use(morgan("dev"));

// public routes (i.e routes where no authorization is required)
app.get("/", (req, res) => res.send("ok"));
app.use("/auth", authRouter);

// private routes
app.use(jwtFilter());
app.get("/private", (req, res) => res.send("Welcome to inPlace"));
app.use("/offers", offersRouter);

app.use(errorHandler()); // Error handling middleware

const PORT = process.env.PORT || process.env.DEFAULT_PORT;
app.listen(PORT, async () => {
	await sequelize.authenticate();
	console.log("Database connection established");
	await sequelize.sync();
	console.log("All models were synchronized successfully");
	console.log(`Server is running on port ${PORT}`);
});
