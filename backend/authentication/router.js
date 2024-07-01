const authRouter = require("express").Router();
const joi = require("joi");

const { defineRoute } = require("../core/define_route");
const { sendMail } = require("../core/mailer");
const { ForbiddenError } = require("../core/errors");

const { User } = require("../users/models");
const { VerificationToken } = require("./models");
const {
	verificationEmail,
	generateVerificationToken,
	decodeVerificationToken,
	generateAuthorizationToken,
	hash,
	compareHash
} = require("./utils");

const FEATURE = "auth";

const registerSchema = joi.object({
	first_name: joi.string().required(),
	last_name: joi.string().required(),
	email: joi.string().email().required(),
	phone_number: joi.string().required(),
	password: joi
		.string()
		.min(8)
		.message("Password must be at least 8 characters long")
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])"))
		.message(
			"Password must contain at least one uppercase letter, one lowercase letter, and one special character"
		)
		.required(),
	confirm_password: joi
		.equal(joi.ref("password"))
		.messages({ "any.only": "Passwords do not match" })
		.required()
});
defineRoute({
	router: authRouter,
	feature: FEATURE,
	path: "/register",
	method: "post",
	description: "Create a new user",
	inputSchema: registerSchema,
	handler: async (req, res) => {
		if (await User.findOne({ where: { email: req.body.email } })) {
			throw new ForbiddenError("Email already in use");
		}

		const verified =
			process.env.REQUIRE_EMAIL_VERIFICATION === "Yes" ? false : true;

		const user = await User.create({
			...req.body,
			verified,
			password: await hash(req.body.password)
		});

		if (!verified) {
			const verificationToken = await VerificationToken.create({
				content: generateVerificationToken(user.id)
			});
			await sendMail(
				verificationEmail(req.body.email, verificationToken)
			);
		}

		res.json(user);
	}
});

defineRoute({
	router: authRouter,
	feature: FEATURE,
	path: "/verify/:token",
	method: "get",
	description: "verify the account verification token that was sent in email",
	handler: async (req, res) => {
		const tokenString = req.params.token;

		let verificationTokenRecord = await VerificationToken.findOne({
			where: { content: tokenString }
		});
		if (!verificationTokenRecord) {
			throw new ForbiddenError("Invalid verification token");
		}

		let decodedToken = undefined;
		try {
			decodedToken = decodeVerificationToken(tokenString);
		} catch (err) {
			throw new ForbiddenError("Invalid verification token");
		}

		const user = await User.findByPk(decodedToken.userId);
		if (!user) {
			throw new ForbiddenError("Invalid verification token");
		}

		if (user.verified) {
			throw new ForbiddenError("Your account has already been verified");
		}

		user.verified = true;
		await user.save();

		await verificationTokenRecord.destroy();

		res.status(200).send("Your account has been verified!");
	}
});

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required()
});
defineRoute({
	router: authRouter,
	feature: FEATURE,
	path: "/login",
	method: "post",
	description: "obtain a jwt given email and password ",
	inputSchema: loginSchema,
	handler: async (req, res) => {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user || !(await compareHash(password, user.password)))
			throw new ForbiddenError("invalid Email or password!");
		const token = generateAuthorizationToken(user.id);
		res.json({
			token,
			user
		});
	}
});

module.exports = { authRouter };
