// Libraries
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { APIDocs } = require("./core/swagger");
require("express-async-errors");

// environment variables
require("dotenv").config();

// Custom modules
const sequelize = require("./core/db");
const { errorHandler } = require("./core/middlewares");
const { authRouter } = require("./authentication/router");
const { privateOffersRouter, publicOffersRouter } = require("./offers/routes");
const { userRouter } = require("./users/routes");
const { likesRouter } = require("./likes/routes");
const {
	attachUserInfoToReq,
	jwtFilter
} = require("./authentication/middlewares");

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(attachUserInfoToReq());

// public routes (i.e routes where no authorization is required)
app.get("/", (req, res) => res.send("ok"));
app.use("/auth", authRouter);
app.use("/offers", publicOffersRouter);

// api docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(APIDocs.get()));

// private routes
app.use(jwtFilter());
app.get("/private", (req, res) => res.send("Welcome to inPlace"));
app.use("/offers", privateOffersRouter);
app.use("/users", userRouter);
app.use("/likes", likesRouter);

app.use(errorHandler()); // Error handling middleware

const PORT = process.env.PORT || process.env.DEFAULT_PORT;
app.listen(PORT, async () => {
	await sequelize.authenticate();
	console.log("Database connection established");
	await sequelize.sync();
	console.log("All models were synchronized successfully");
	console.log(`Server is running on port ${PORT}`);
});
