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

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("OK");
});
app.use("/debug", (req, res) => res.status(200).json({ debug: true }));
app.use("/auth", authRouter);

// Error handling middleware
app.use(errorHandler());

const PORT = process.env.PORT || process.env.DEFAULT_PORT;
app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log("Database connection established");
  await sequelize.sync();
  console.log("All models were synchronized successfully");
  console.log(`Server is running on port ${PORT}`);
});
