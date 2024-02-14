const { User } = require("./models");
const userRouter = require("express").Router();
const { schemaValidator } = require("../core/middlewares");
const joi = require("joi");

const updateProfileSchema = joi.object({
	first_name: joi.string(),
	last_name: joi.string()
});
userRouter.patch(
	"/updateProfile",
	schemaValidator(updateProfileSchema),
	async (req, res) => {
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
);

module.exports = { userRouter };
