const userRouter = require("express").Router();

const { NotFoundError } = require("../core/errors");

const { User } = require("./models");

userRouter.get("/details/:id", async (req, res) => {
	const userId = req.params.id;

	const user = await User.findByPk(userId);

	if (!user) {
		throw new NotFoundError("User Not Found");
	}

	res.json(user);
});

module.exports = { userRouter };
