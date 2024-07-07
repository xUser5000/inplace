const joi = require("joi");

const { defineRoute } = require("../core/define_route");
const { NotFoundError } = require("../core/errors");
const { upload } = require("../core/middlewares");
const { preprocessBuffer, uploadBuffer } = require("../core/images");

const { User } = require("./models");
const { Offer } = require("../offers/models");

const userRouter = require("express").Router();

const FEATURE = "users";

defineRoute({
	router: userRouter,
	feature: FEATURE,
	path: "/user/:id",
	method: "get",
	description: "Get user details",
	handler: async (req, res) => {
		const userId = req.params.id;
		const user = await User.findByPk(userId);
		if (!user) throw new NotFoundError("User Not Found");
		res.json(user);
	}
});

defineRoute({
	router: userRouter,
	feature: FEATURE,
	path: "/user/:id/offers",
	method: "get",
	description: "list all offers posted by a user",
	handler: async (req, res) => {
		const userId = req.params.id;
		const user = await User.findByPk(userId);
		if (!user) throw new NotFoundError("User not found!");
		const offers = await Offer.findAll({ where: { userId } });
		res.json(offers);
	}
});

const updateProfileSchema = joi.object({
	first_name: joi.string(),
	last_name: joi.string(),
	bio: joi.string().allow("").max(50),
	phone_number: joi.string()
});
defineRoute({
	router: userRouter,
	feature: FEATURE,
	path: "/update",
	method: "patch",
	description: "Update the user first name, last name, or bio",
	inputSchema: updateProfileSchema,
	middlewares: [upload.single("avatar")],
	handler: async (req, res) => {
		const user = await User.findByPk(req.userId);

		const { first_name, last_name, bio, phone_number } = req.body;
		const file = req.file;

		if (first_name) user.first_name = first_name;
		if (last_name) user.last_name = last_name;
		user.bio = bio;
		if (phone_number) user.phone_number = phone_number;
		if (file) {
			file.originalname = Date.now() + "__" + file.originalname;
			const preProcessedBuffer = await preprocessBuffer(file.buffer);
			const result = await uploadBuffer(preProcessedBuffer);
			user.avatar = result.secure_url;
		}

		user.save();
		res.json(user);
	}
});

module.exports = { userRouter };
