const { User } = require("./models");
const userRouter = require("express").Router();
const joi = require("joi");
const { defineRoute } = require("../core/define_route");

const FEATURE = "users";

const updateProfileSchema = joi.object({
	first_name: joi.string(),
	last_name: joi.string()
});

defineRoute({
	router: userRouter,
	feature: FEATURE,
	path: "/updateProfile",
	method: "patch",
	description: "Update the user first_name or last_name or both",
	inputSchema: updateProfileSchema,
	handler: async (req, res) => {
		const user = await User.findByPk(req.userId);

		if (req.body.first_name) {
			user.first_name = req.body.first_name;
		}

		if (req.body.last_name) {
			user.last_name = req.body.last_name;
		}

		user.save();

		res.json(user);
	}
});

module.exports = { userRouter };
