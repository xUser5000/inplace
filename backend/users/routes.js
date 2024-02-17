const { User } = require("./models");
const userRouter = require("express").Router();
const joi = require("joi");
const { defineRoute } = require("../core/define_route");
const FEATURE = "users";

userRouter.get("/get-all-users", async (req, res) => {
	res.json(await User.findAll());
});
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
		await User.update(
			{ first_name: req.body.first_name, last_name: req.body.last_name },
			{
				where: {
					id: req.userId
				}
			}
		);
		res.json("ok");
	}
});
module.exports = { userRouter };
